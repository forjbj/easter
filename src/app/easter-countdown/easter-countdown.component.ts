import { Component } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-easter-countdown',
  templateUrl: './easter-countdown.component.html',
  styleUrls: ['./easter-countdown.component.scss']
})
export class EasterCountdownComponent {

  private sunX: string;
  private sunY: string;
  private el?: any;

  constructor(public time: TimeService) {

    this.sunX = (Math.floor(Math.random() * (90 - 7 + 1) ) + 7).toString() + '%'; // 90% of width for sun to be in; not including first and last 5%
    this.sunY = (Math.floor(Math.random() * (40 - 7 + 1) ) + 7).toString() + '%'; // top 40% of height for sun to be in; not including top 7%
  }
  ngAfterViewInit() {

    this.el = document.getElementById('sun');
    this.el.style.top = this.sunY;
    this.el.style.left = this.sunX;
    // console.log(this.sunX, this.sunY)



    setInterval(()=>{this.time.timeDifference();
      // console.log(this.time.seconds)
    }, 1000)
  }
}
