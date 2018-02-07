import { Component, OnInit } from '@angular/core';

import {Card} from '../models/card.model'

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private _card: Card) { 
 
  }

  ngOnInit() {
    this._card = {
      
    id: 'asd',
    pro_pic: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    full_name: 'Shiba Inu',
    date: 132564789,
    post_pic: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    caption: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`,
    likes: 123213,
    comments: 123213
    }
  }

  onReload(ccard: Card){
    console.log(ccard);
  }

}
