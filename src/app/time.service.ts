import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public timeNow = new Date;
  // public timeNow = new Date("03/31/2024 15:59:00"); //for testing and change in timeDifference function below

  public timeNumber: any;
  public easterSunday: any;
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

  //variable for scripture
  public scriptureCode = 0; //default for random scripture; 1 = Matthew 27; 2 = Luke 24

  public timeDifference(){

    let time = new Date;
    // let time = this.timeNow; //for testing

    this.timeDiff = this.easter - time.getTime();
    this.days = Math.floor(this.timeDiff/86400000); // convert milliseconds to days:- 1000 * 60 * 60 * 24 = 86400000)
    this.hours = Math.floor((this.timeDiff%86400000)/3600000);  //convert milliseconds to hours left in day:- (time_difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60) 
    this.minutes = Math.floor((this.timeDiff%3600000)/60000);  //convert milliseconds to minutes left in hour:- (time_difference%(1000 * 60 * 60))/(1000 * 60 )
    this.seconds = Math.floor((this.timeDiff%(1000 * 60))/(1000));  //convert milliseconds to seconds left in hour:- (time_difference%(1000 * 60))/(1000 * 60 )
  }
  
}
