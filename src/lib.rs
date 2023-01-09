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