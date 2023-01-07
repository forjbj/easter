import { Component, ElementRef, OnInit } from '@angular/core';
import * as bibleJson from '../../assets/bible/Bible.json';
import * as wasm from '../../../pkg';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-bible-verse',
  templateUrl: './bible-verse.component.html',
  styleUrls: ['./bible-verse.component.scss']
})
export class BibleVerseComponent {
  public result?: string;
  public chapter?: number;
  public verse?: number;
  public observer?: IntersectionObserver;
  public bookSelected?: number;
  public testament?: number;
  public bookName: any;

  public bible: any = bibleJson;

  
constructor( public title: Title,
             public meta: Meta,
             public elementRef:ElementRef,) {

  if (typeof Worker !== 'undefined') {
    // Create a new
    const worker = new Worker(new URL('./bible-verse.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      this.result = data;
    };
    worker.postMessage(wasm.render_widget());
  } else {
    // Web workers are not supported in this environment.
    // You should add a fallback so that your program still executes correctly.
    this.result = wasm.render_widget();
  }

}
ngOnInit(){ }

ngAfterViewInit(): void {
  setTimeout(() => {
    const name = this.elementRef.nativeElement.querySelector(".head");
    const splits = name.id.toString().split('-');
    this.testament = Number(splits[0]);
    this.bookSelected = Number(splits[1]);
    this.chapter = Number(splits[2]) + 1; // add 1 to get right chapter number
    this.bookName = this.bible[this.testament].books[this.bookSelected].bookName;
    const ver = name.getElementsByTagName("DIV");
    this.verse = Math.floor(Math.random() * ver.length) + 1;

    ver[this.verse -1].scrollIntoView({
                          behavior: 'auto',
                          block: 'center',
                          inline: 'center'
                      });
  }, 100); // give it a moment to redraw

}
reload() {
 document.location.reload();
}
}
export function read_file() {
return JSON.stringify(bibleJson); // WASM WORKS! don't touch
}
