
use wasm_bindgen::prelude::*; //import everything to create library

extern crate serde_json;
extern crate rand;

use serde_json::Value as jsonValue;
use serde_json::Value::Null as jsonNull;
use rand::prelude::*;

#[wasm_bindgen(module = "src/app/app.component.ts")]
extern "C" {
    #[wasm_bindgen]
    fn read_file() -> JsValue;
}

#[wasm_bindgen]
pub fn render_widget() -> String {  //need to be string for serde_json to index
    // random generate book
    let mut test_rng = thread_rng();
    let test: usize = test_rng.gen_range(0..2); // excludes higher number
    let book: usize;
    if test == 0 {
        let mut book_rng = thread_rng();
        book = book_rng.gen_range(0..39);
    } else {
        let mut book_rng = thread_rng();
        book = book_rng.gen_range(0..27);
    }

    let mut result: String;
    let psalms: bool;
    if test == 0 && book == 18 { // use this to check input array values against Psalms for section rendering
        psalms = true; 
    } else {
        psalms = false;
    }

    let file = read_file();

    let contents: jsonValue = serde_json::from_str(&file.as_string().expect("Can't read json")).unwrap();

    //because of type change from javascript to rust: first Array in Object has the items labelled "0" and "1" (numbers in strings) **CAN'T CHANGE JSON
    let bible_book = &contents[format!("{}", &test)]["books"][&book];

    let current = bible_book["chapters"].as_array().unwrap();
    let num_chapters = current.len();
    let mut chap_rng = thread_rng();
    let chap = chap_rng.gen_range(0..num_chapters);

    result = format!("<section class = \"head\" id =\"{}-{}-{}\">", test, book, chap);

    let chapter = &current[chap];
    for verse in chapter["verses"].as_array().unwrap() {
        if verse["ver"] == 1 {
            if psalms {
                let desc = format!("<p class=\"psalm fontType\">{}</p>", verse["description"].as_str().unwrap()); //unwrap necessary to remove ""
                result.push_str(&desc);
            };
            let first = format!("<div id = \"1\"><p class=\" ver firstVerse fontType\">{}</p></div>", verse["scr"].as_str().unwrap());
            result.push_str(&first);
        } else {     
            if psalms {               // needed for psalm 119
                if verse["description"] != jsonNull {
                    let desc = format!("<p class=\"psalm fontType\">{}</p>",verse["description"].as_str().unwrap()); //unwrap necessary to remove ""
                    result.push_str(&desc);
                }
            }
            let script = format!("<div id = \"{0}\"  class = \"ver verses\"><p class=\"verseNumber fontType\">{0}</p>
                                    <p class = \"scripture fontType\">{1}</p></div>", verse["ver"], verse["scr"].as_str().unwrap());
            result.push_str(&script);
        }
    }

    if bible_book["note"] != jsonNull && chapter == current.last().unwrap(){
        let note =  format!("<br><div class = \"notes\">{}</div></section>", bible_book["note"].as_str().unwrap());
        result.push_str(&note);
    } else {
        result.push_str("</section>")
    }

    return result;
}

#[wasm_bindgen]
pub fn easter_sunday(current_year:i32) -> String { 

    return easter_sunday_calc(current_year);

    pub fn easter_sunday_calc(current_year: i32) -> String {
  
        let full_moon_date = moon_date(current_year);
        
        //Match fullMoonDate against day offset (offset is added days ie.if in first group add '0', second add '1' etc) for Sunday - thia only works for the years 2000 - 2099; see later comment
        let full_moon_offeset_one = offset_one(&full_moon_date);

        // second table is omitted as table takes Easter dates to the year 4000; only going to do the years 2000 - 2099 so table not necessary all the aforementioned dates return '0'; if it gets to the year 2099 change the following from '0' to '5'; also see comment in function 'offset_three'
        let full_moon_offset_two = 0;

        let full_moon_offset_three = offset_three(current_year);

        // Add offsetOne, offsetTwo(which is '0') and offsetThree; use result in table to add to full moon date to correct for Sunday - Easter Sunday
        let full_moon_offset_result = offset_result(full_moon_offeset_one,  full_moon_offset_two, full_moon_offset_three);

        let mut day = (((&full_moon_date[1..].parse::<i32>().unwrap())) + full_moon_offset_result).to_string();
        let mut month;
        // print!("{}\n", full_moon_date.chars().next().unwrap());
        if (full_moon_date.chars().next().unwrap()) == 'M'{
        month = "03";
        } else {
        month = "04"
        }
        if (day.parse::<i32>().unwrap()) > 31 {
            month = "04";
            day = ((day.parse::<i32>().unwrap()) - 31 ).to_string();
        }
        if day.chars().count() < 2 {
            let mut iso = String::from("0");
            iso.push_str(&day);
            day = iso;

        }
        let easter_sunday = format!("{}/{}/{}", month,day,current_year);//javascript only works in american money; utc or locale time doesn't work give weird answers and offsets.
        return easter_sunday;
    }


    pub fn moon_date(current_year: i32)-> String {
        let full_moon_date_keys = [0.0, 0.052, 0.105, 0.157, 0.210, 0.263, 0.315, 0.368, 0.421, 0.473, 0.526, 0.578, 0.631, 0.684, 0.736, 0.789, 0.842, 0.894, 0.947 ];
        let full_moon_date_values = ["A14", "A3", "M23", "A11", "M31", "A18", "A8", "M28", "A16", "A5", "M25", "A13", "A2", "M22", "A10", "M30", "A17", "A7", "M27" ] ;//'A7' means full moon on April 7
        //Divide current year by 19; take first 3 decimal places against full_moon_date_keys[]
        let pre_current_key_var:f64 = current_year as f64  / 19.0; //overly complex way to get the first 3 decimal places of answer
        let current_key_var:f64 = ((((pre_current_key_var * 1000.0).floor() / 1000.0) - (pre_current_key_var.floor())) * 1000.0).round() / 1000.0; //overly complex way to get the first 3 decimal places of answer
        let mut full_moon_date_code = "";
        if let Some(index) = full_moon_date_keys.iter().position(|&x| x == current_key_var) {
            full_moon_date_code = full_moon_date_values[index]
        }
        return full_moon_date_code.to_string();
    }

    pub fn offset_one(full_moon_date: &str) -> i32{
        let full_moon_offset_one_values = [["M26", "M26", "A2", "A9", "A16"], ["M27", "M27", "A3", "A10", "A17"], ["M21", "M28", "A4", "A11", "A18"], ["M22", "M22", "M29", "A5", "A12"], ["M23", "M23", "M30", "A6", "A13"], ["M24", "M24", "M31", "A7", "A14"], ["M25", "M25", "A1", "A8", "A15"]];//doubles used to stop Rust complaining that each array has a different number of elements
        let mut offset_index:i32 = 0;
        for (index,  arr) in full_moon_offset_one_values.iter().enumerate() {
            if let Some(_sub_index) = arr.iter().position(|&y| y == full_moon_date) {
                offset_index = index as i32;
            }
        }
    return offset_index;
    }

    pub fn offset_three(current_year: i32) -> i32 {
        let full_moon_offset_three_values = [[00,00,06,17,23,28,34,45,51,56,62,73,79,84,90],[01,07,12,18,29,35,40,46,57,63,68,74,85,91,96],[02,02,13,19,24,30,41,47,52,58,69,75,80,86,97],[03,08,14,25,31,36,42,53,59,64,70,81,87,92,98],[09,09,15,20,26,37,43,48,54,65,71,76,82,93,99],[04,04,10,21,27,32,38,49,55,60,66,77,83,88,94],[05,05,11,16,22,33,39,44,50,61,67,72,78,89,95]]; //doubles used to stop Rust complaining that each array has a different number of elements
        let mut offset_index:i32 = 0;
        for (index,  arr) in full_moon_offset_three_values.iter().enumerate() {
            if let Some(_sub_index) = arr.iter().position(|&y| y == (current_year - 2000)) { // change from 2000 to 2100 if you are in the year 2099
                offset_index = index as i32;
            }
        }
    return offset_index;
    }

    pub fn offset_result(offset_one: i32, offset_two: i32, offset_three: i32) -> i32 {
        let offset_result_keys =[[0,7,14],[1,8,15],[2,9,16],[3,10,17],[4,11,18],[5,5,12],[6,6,13]]; //doubles used to stop Rust complaining that each array has a different number of elements
        let offset_result_values = [7,6,5,4,3,2,1]; //ie.Sun, Mon, Tues etc    
        let sum = offset_one + offset_two + offset_three;
        let mut result:i32 = 0;
        for(index, arr) in offset_result_keys.iter().enumerate() {
            if let Some(_sub_index) = arr.iter().position(|&x| x == sum) {
                result = offset_result_values[index]
            }
        }
        return result;
    }
}