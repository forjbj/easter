import { Component } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-easter-saturday',
  templateUrl: './easter-saturday.component.html',
  styleUrls: ['./easter-saturday.component.scss']
})
export class EasterSaturdayComponent {

  constructor( public time: TimeService ) {

  }

ngAfterViewInit() {
  setInterval(()=>{this.time.timeDifference();
    // console.log(this.time.seconds)
  }, 1000)
}
}
