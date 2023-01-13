import { Component } from '@angular/core';
import { TimeService } from './time.service';
import * as bibleJson from '../assets/bible/Bible.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easter-countdown';
  public now :any //= new Date().getTime();
  public easterSunday: any;
  public goodFriday: any; 
  public heartOfTheEarth: any;
  public easterOver: any;

  public pageTitle: string;
  public countdown: boolean = true;

  constructor(public time: TimeService){
    this.now = this.time.time.getTime();
    this.goodFriday =  this.time.easterSunday - (2 * 86400000);// as milliseconds remove 2 days worth of milliseconds; 
    this.heartOfTheEarth = this. time.easterSunday - 86400000;
    this.easterOver = this.time.easterSunday + 86400000;

    if (this.now > this.goodFriday && this.now < this.heartOfTheEarth) {
      this.pageTitle ="GOOD FRIDAY"
    } else if (this.now > this.heartOfTheEarth && this.now < this.easterSunday) {
      this.pageTitle ="EASTER SATURDAY"
    } else if (this.now > this.easterSunday && this.now <  this.easterOver) { 
      this.pageTitle ="EASTER SUNDAY"
      this.countdown = false;
    } else {
      this.pageTitle ="..."
    }
  }

   ngAfterViewInit() {
    if (this.countdown){
      setInterval(()=>{this.time.timeDifference();
        // console.log(this.time.seconds)
      }, 1000)
    }
   }

}
export function read_file() {
  return JSON.stringify(bibleJson); // WASM WORKS! don't touch
}