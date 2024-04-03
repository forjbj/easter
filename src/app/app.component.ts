import { Component } from '@angular/core';
import { TimeService } from './time.service';
import * as wasm from '../../pkg';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // public easterSunday: any;
  public goodFriday: any; 
  public heartOfTheEarth: any;
  public easterOver: any;

  public countdown: boolean = true;

  constructor(public time: TimeService,
              private router: Router){


    this.load();   

  }

  ngAfterViewInit(){
    setInterval(()=>{
      this.load();
      // check every half hour (3600000 milliseconds in a hour)
    }, 1800000)
  }

  load() {

    this.time.easterSunday = wasm.easter_sunday(this.time.timeNow.getFullYear()); // this is in american format MM//DD/YYYY as javascript doesn't work without it

    // not stellar; but only way to do this at the moment as Rust/Wasm doesn't do time.
    this.time.easter = new Date (this.time.easterSunday).getTime();
    if (this.time.timeNow.getTime() > (this.time.easter + 86400000)){ //add 24 hours (in milliseconds) to bring to easter monday
      this.time.easterSunday = wasm.easter_sunday(this.time.timeNow.getFullYear() + 1);
      this.time.easter = new Date (this.time.easterSunday).getTime();
    }


    this.time.timeNumber = this.time.timeNow.getTime();
    this.goodFriday =  this.time.easter - (2 * 86400000);// as milliseconds remove 2 days worth of milliseconds; 
    this.heartOfTheEarth = this. time.easter - 86400000;
    this.easterOver = this.time.easter + 86400000;

    //set date for countdown page
    this.time.easterDateFormat();
    //set countdown timer to initial values before navigating to page
    this.time.timeDifference();

    if (this.time.timeNumber > this.goodFriday && this.time.timeNumber < this.heartOfTheEarth) {
      if ((this.goodFriday + 43200000) < this.time.timeNumber && (this.goodFriday + 54000000) > this.time.timeNumber){
        this.time.goodFridayDarkness = true;
      } else if ((this.goodFriday + 54000000) < this.time.timeNumber) {
        this.time.goodFridayGrave = true;
      } else {
        this.time.goodFridayMorning = true;
      }
      this.time.scriptureCode = 1; // change to load Luke 23
      this.time.collapsed = false; // show scripture
      this.router.navigate(["goodFriday"]);

    } else if (this.time.timeNumber > this.heartOfTheEarth && this.time.timeNumber < this.time.easter) {
      this.time.scriptureCode = 0;
      this.router.navigate(["easterSaturday"]);
    } else if (this.time.timeNumber > this.time.easter && this.time.timeNumber <  this.easterOver) { 
      this.time.scriptureCode = 2; //change to load Matthew 28
      this.time.collapsed = false; // show scripture
      this.router.navigate(["easterSunday"]);
    } else {
      this.time.scriptureCode = 0; //random scripture code for WASM function
      this.router.navigate(["easterCountdown"]);
    }
  }
}
  