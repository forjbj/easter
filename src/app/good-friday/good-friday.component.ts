import { Component } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-good-friday',
  templateUrl: './good-friday.component.html',
  styleUrls: ['./good-friday.component.scss']
})
export class GoodFridayComponent {

  public backgroundPage: any;

  constructor(public time: TimeService){
    if (this.time.goodFridayMorning == true){
      this.backgroundPage = "crossPage";
    } else if (this.time.goodFridayDarkness == true) {
      this.backgroundPage = "darknessPage";
    } else {
      this.backgroundPage = "gravePage"
    }
  }
  ngAfterViewInit() {
    //Countdown timer
    setInterval(()=>{this.time.timeDifference();
      // console.log(this.time.seconds)
    }, 1000)
  }

}
