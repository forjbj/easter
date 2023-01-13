import { Injectable } from '@angular/core';
import * as wasm from '../../pkg';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
  // public time = new Date; //needed twice or won't countdown
  public time = new Date(); //needed twice or won't countdown
  public easterSunday: any;
  public easter: any;
  public timeDiff: any;
  public days: any;
  public hours: any;
  public minutes: any;
  public seconds: any;

  public timeDifference(){
    this.time = new Date; //needed twice or won't countdown
    this.timeDiff = this.easter - this.time.getTime();
    this.days = Math.floor(this.timeDiff/86400000); // convert milliseconds to days:- 1000 * 60 * 60 * 24 = 86400000)
    this.hours = Math.floor((this.timeDiff%86400000)/3600000);  //convert milliseconds to hours left in day:- (time_difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60) 
    this.minutes = Math.floor((this.timeDiff%3600000)/60000);  //convert milliseconds to minutes left in hour:- (time_difference%(1000 * 60 * 60))/(1000 * 60 )
    this.seconds = Math.floor((this.timeDiff%(1000 * 60))/(1000));  //convert milliseconds to seconds left in hour:- (time_difference%(1000 * 60))/(1000 * 60 )
  }

  constructor() {
    this.easterSunday = wasm.easter_sunday(this.time.getFullYear());
    this.easter = new Date (this.easterSunday).getTime();
    if (this.time.getTime() > (this.easter + 86400000)){ //add 24 hours (in milliseconds) to bring to easter monday
      this.easterSunday = wasm.easter_sunday(this.time.getFullYear() + 1);
      this.easter = new Date (this.easterSunday).getTime();
    }
    this.timeDifference()
  }
  
}
