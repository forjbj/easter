import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
  public time: any;
  public easter = new Date("04/09/2023").getTime();
  public timeDiff: any;
  public days: any;
  public hours: any;
  public minutes: any;
  public seconds: any;

  public timeDifference(){
    this.time = new Date;
    this.timeDiff = this.easter - this.time.getTime();
    this.days = Math.floor(this.timeDiff/86400000); // convert milliseconds to days:- 1000 * 60 * 60 * 24 = 86400000)
    this.hours = Math.floor((this.timeDiff%86400000)/3600000);  //convert milliseconds to hours left in day:- (time_difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60) 
    this.minutes = Math.floor((this.timeDiff%3600000)/60000);  //convert milliseconds to minutes left in hour:- (time_difference%(1000 * 60 * 60))/(1000 * 60 )
    this.seconds = Math.floor((this.timeDiff%(1000 * 60))/(1000));  //convert milliseconds to seconds left in hour:- (time_difference%(1000 * 60))/(1000 * 60 )
  }

  constructor() {
    this.timeDifference()
  }
  
}
