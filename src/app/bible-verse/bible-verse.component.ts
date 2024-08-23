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
  public verse: number = 1;
  public observer?: IntersectionObserver;
  public bookSelected?: number;
  public testament?: number;
  public bookName?: any;

  public orientation?: any;

  public bible: any = bibleJson;

  public dialog: any;

  public open: boolean = false;
    
  constructor( public title: Title,
             public meta: Meta,
             public elementRef:ElementRef,
             public time: TimeService) {
              
  }

  ngAfterViewInit(){

    this.dialog = document.querySelector("dialog")

    //add swipe action to display bible verse
    this.pointerEvents()

    // Collapse Bible on landscape orientaion
    this.orientation = window.matchMedia("(orientation: landscape)")
    this.collapseLandscape(this.orientation);
    this.orientation.addEventListener("change", ()=> {
      this.collapseLandscape(this.orientation);
    })

      this.load(); //has to be here not in the constructor; doesn't load bible info and scroll in constructor

  }
  collapseLandscape(orientation: any) {
    if (orientation.matches) {
      this.time.collapsed = true;
    }
    else {
      this.time.collapsed = false;
    }
  }

  load() {
    this.threadWASM();
    setTimeout(() => { //setTimeOut 0.4secs; necessary as bibleInfo not populated on start ??? not sure why; reload produces last book info without this
      this.bibleInfo();
    }, 400);
  }

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
      const ver = document?.getElementsByClassName("ver")
      this.testament = Number(splits[0]);
      this.bookSelected = Number(splits[1]);
      this.chapter = Number(splits[2]) + 1; // add 1 to get right chapter number
      this.bookName = this.bible[this.testament].books[this.bookSelected].bookName;
      if (this.time.scriptureCode === 0) {
        this.verse = Math.floor(Math.random() * ver.length) + 1;
      } else if (this.time.scriptureCode == 1){
        if (this.time.goodFridayMorning == true) {
          this.verse = 33
        } else if (this.time.goodFridayDarkness == true){
          this.verse = 44
        } else {
          this.verse = 46
        }
      } else if (this.time.scriptureCode == 2) {
        this.verse = 6
      }
      // if (this.opened == false) {
        setTimeout(() => { 
          this.scrollToVer();
        },300)
      // }
    }
  }
  scrollToVer(){
    const ver = document?.getElementsByClassName("ver")
    ver[this.verse -1].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center'
    });
  }

  openDialog(){
    this.open = true;
    // if(this.opened == false) {
      setTimeout(()=> {
        this.scrollToVer()
      },100)
    // }
  }

  pointerEvents (){
    const start = (e: any) => {
      startPoint = e.clientY;
    }
    const move = (e: any) => {
        if(e.clientY > startPoint){
        this.time.collapsed = true;
      }
      if (e.clientY < startPoint){
        this.time.collapsed = false;
      }
    }
    let startPoint: any;
    let swipe = document.getElementById('swipe');
    swipe?.addEventListener('pointermove', move, false);
    swipe?.addEventListener('pointerdown', start, false);
    startPoint = null;
  }
  backdropClose(event: any){
    let rect = event.target.getBoundingClientRect();
    //only close if outside dialog box.
    if (rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
    ) {
        this.dialog.close();
        this.open = false;
    }
  }
}
export function read_file() { // MUST be in here as lib.rs points here
  return JSON.stringify(bibleJson); // WASM WORKS! don't touch
}
