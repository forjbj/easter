import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-easter-countdown',
  templateUrl: './easter-countdown.component.html',
  styleUrls: ['./easter-countdown.component.scss']
})
export class EasterCountdownComponent {

  private sunX: string;
  private sunY: string;
  private elSun?: any;
  private cloudOneDelay: string;
  private cloudTwoDelay: string;
  private cloudThreeDelay: string;
  private elCloudOne?: any;
  private elCloudTwo?: any;
  private elCloudThree?: any;

  constructor(public time: TimeService) {

    this.sunX = (Math.floor(Math.random() * (90 - 7 + 1) ) + 7).toString() + '%'; // 90% of width for sun to be in; not including first and last 5%
    this.sunY = (Math.floor(Math.random() * (40 - 7 + 1) ) + 7).toString() + '%'; // top 40% of height for sun to be in; not including top 7%
    this.cloudOneDelay = (Math.floor(Math.random() * (-40 - -10) ) -7 ).toString() + 's'; // random animation delay for clouds; different start points
    this.cloudTwoDelay = (Math.floor(Math.random() * (-40 - -10) ) -7 ).toString() + 's'; // random animation delay for clouds; different start points
    this.cloudThreeDelay = (Math.floor(Math.random() * (-40 - -10) ) -7 ).toString() + 's'; // random animation delay for clouds; different start points
  }
  ngAfterViewInit() {

    this.elSun = document.getElementById('sun');
    this.elSun.style.top = this.sunY;
    this.elSun.style.left = this.sunX;

    this.elCloudOne = document.getElementById('cloudOne')
    this.elCloudTwo = document.getElementById('cloudTwo')
    this.elCloudThree = document.getElementById('cloudThree')
    this.elCloudOne.style.animationDelay = this.cloudOneDelay;
    this.elCloudTwo.style.animationDelay = this.cloudTwoDelay;
    this.elCloudThree.style.animationDelay = this.cloudThreeDelay;
    console.log(this.cloudThreeDelay)
    // console.log(this.sunX, this.sunY)



    setInterval(()=>{this.time.timeDifference();
      // console.log(this.time.seconds)
    }, 1000)
  }
}
