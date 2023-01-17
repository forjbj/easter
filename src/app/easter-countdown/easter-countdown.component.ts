import { Component } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-easter-countdown',
  templateUrl: './easter-countdown.component.html',
  styleUrls: ['./easter-countdown.component.scss']
})
export class EasterCountdownComponent {

  constructor(public time: TimeService) {

  }
  ngAfterViewInit() {
    setInterval(()=>{this.time.timeDifference();
      // console.log(this.time.seconds)
    }, 1000)
  }
}
