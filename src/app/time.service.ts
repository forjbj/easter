import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public timeNow = new Date;
  // public timeNow = new Date("4/19/2025 15:59:00"); //for testing and change in timeDifference function below

  public timeNumber: any;
  public easterSunday: any;
  public easterDate: any;
  public easter: any;
  public timeDiff: any;
  public days: any;
  public hours: any;
  public minutes: any;
  public seconds: any;

  //varibles for Good Friday background changes and for scriptures
  public goodFridayMorning = false;
  public goodFridayDarkness = false;
  public goodFridayGrave = false;

  //variables for scripture
  public scriptureCode = 0; //default for random scripture; 1 = Matthew 27; 2 = Luke 24
  public collapsed: boolean = false;

  public timeDifference(){

    let time = new Date;
    // let time = this.timeNow; //for testing see timeNow variable above

    this.timeDiff = this.easter - time.getTime();
    this.days = Math.floor(this.timeDiff/86400000); // convert milliseconds to days:- 1000 * 60 * 60 * 24 = 86400000)
    this.hours = Math.floor((this.timeDiff%86400000)/3600000);  //convert milliseconds to hours left in day:- (time_difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60) 
    this.minutes = Math.floor((this.timeDiff%3600000)/60000);  //convert milliseconds to minutes left in hour:- (time_difference%(1000 * 60 * 60))/(1000 * 60 )
    this.seconds = Math.floor((this.timeDiff%(1000 * 60))/(1000));  //convert milliseconds to seconds left in hour:- (time_difference%(1000 * 60))/(1000 * 60 )
  }

  public easterDateFormat(){
    let easterDateString = new Date (this.easterSunday);
    let easterDay = easterDateString.getDate();
    let easterMonth = easterDateString.toLocaleString("default", { month: "long" });
    let easterYear = easterDateString.getFullYear();

    const nthNumber = (number: number) => {
      if (number > 3 && number < 21) return "th";
      switch (number % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return this.easterDate = easterDay + nthNumber(easterDay) + " " + easterMonth + ", " + easterYear;

  }
  
}
