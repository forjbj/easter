import { Component } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-easter-sunday',
  templateUrl: './easter-sunday.component.html',
  styleUrls: ['./easter-sunday.component.scss']
})
export class EasterSundayComponent {

  constructor(public time: TimeService) {
    
  }

}
