import { Component } from '@angular/core';
import { TimeService } from './time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easter-countdown';
  public now = new Date().getTime();
  public easterSunday = new Date("04/09/2023").getTime(); // dates are in american money mm/dd/yyyy; .getTime() in milliseconds
  // public easterSunday = new Date("01/06/2023").getTime(); // dates are in american money mm/dd/yyyy; .getTime() in milliseconds

  public goodFriday =  this.easterSunday - (2 * 86400000);// as milliseconds remove 2 days worth of milliseconds; 
  public heartOfTheEarth = this. easterSunday - 86400000;
  public easterOver = this.easterSunday + 86400000;

  public pageTitle: string;
  public countdown: boolean = true;

  constructor(public time: TimeService){
    if (this.now > this.goodFriday && this.now < this.heartOfTheEarth) {
      this.pageTitle ="GOOD FRIDAY"
    } else if (this.now > this.heartOfTheEarth && this.now < this.easterSunday) {
      this.pageTitle ="EASTER SATURDAY"
    } else if (this.now > this.easterSunday && this.now <  this.easterOver) {  //(this.easterSunday.setDate(this.easterSunday.getDate() + 1))) {
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
