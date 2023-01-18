import { Component, ElementRef } from '@angular/core';
import * as bibleJson from '../../assets/bible/Bible.json';
import * as wasm from '../../../pkg';
import { Meta, Title } from '@angular/platform-browser';
import { TimeService } from '../time.service';


@Component({
  selector: 'app-bible-verse',
  templateUrl: './bible-verse.component.html',
  styleUrls: ['./bible-verse.component.scss']
})
export class BibleVerseComponent {
  public result?: string = ""; //empty string necessary or 'undefined' shows up briefly on screen
  public chapter?: number;
  public verse?: number;
  public observer?: IntersectionObserver;
  public bookSelected?: number;
  public testament?: number;
  public bookName?: any;

  public bible: any = bibleJson;

  
  constructor( public title: Title,
             public meta: Meta,
             public elementRef:ElementRef,
             public time: TimeService) {

  this.load()

  }

  load() {
    // navigator.vibrate(300);
    this.threadWASM();
    setTimeout(() => { //setTimeOut 0.5secs; necessary as bibleInfo not populated on start ??? not sure why; reload produces last book info without this
      this.bibleInfo()
    }, 300)  }

  threadWASM() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./bible-verse.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.result = data;
      };
      worker.postMessage(wasm.render_widget(this.time.scriptureCode));
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      this.result = wasm.render_widget(this.time.scriptureCode);
    }
  }

  bibleInfo() {
    if (this.elementRef?.nativeElement.querySelector(".head")) { //necessary or error for null values below on inital load
      const name: any = this.elementRef?.nativeElement.querySelector(".head");
      const splits = name.id.toString().split('-');
      this.testament = Number(splits[0]);
      this.bookSelected = Number(splits[1]);
      this.chapter = Number(splits[2]) + 1; // add 1 to get right chapter number
      this.bookName = this.bible[this.testament].books[this.bookSelected].bookName;
      const ver = name?.getElementsByTagName("DIV");
      if (this.time.scriptureCode == 1){
        if (this.time.goodFridayMorning == true) {
          this.verse = 33
        } else if (this.time.goodFridayDarkness == true){
          this.verse = 44
        } else {
          this.verse = 46
        }
      } else if (this.time.scriptureCode == 2) {
        this.verse = 6
      } else {
        this.verse = Math.floor(Math.random() * ver.length) + 1;
      }

      ver[this.verse -1].scrollIntoView({
                            behavior: 'auto',
                            block: 'start',
                            inline: 'center'
                        });
    }
  }
}
export function read_file() { // MUST be in here as lib.rs points here
  return JSON.stringify(bibleJson); // WASM WORKS! don't touch
}
