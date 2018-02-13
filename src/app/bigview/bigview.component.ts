import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { InstagramService } from '../services/instagram.service';
import { DatabaseService } from '../services/database.service';
import { FirebaseService } from '../services/firebase.service';

//Model
import {Card} from '../models/card.model';

import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'bigview',
  templateUrl: './bigview.component.html',
  styleUrls: ['./bigview.component.css']
})
export class BigviewComponent implements OnInit {

  allCards: Card[];
  mobWidth: any;
   statusCode: number;
   requestProcessing = false;
   articleIdToUpdate = null;
   processValidation = false;

  cardForm = new FormGroup(
    {
    URL: new FormControl('', Validators.required)
    //category: new FormControl('', Validators.required)	   
    }
);

  constructor(private _card: Card,
    private dataServ: DatabaseService,
    private instaAPI: InstagramService,
    private firebase: FirebaseService
  ) { 
 
  }
  /*
  ngOnInit() {
    this.getAllCards();
  }
*/
public carouselOne: NgxCarousel;
  ngOnInit() {

    this.mobWidth = window.screen.width;
    console.log(this.mobWidth)

    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }

    var x = this.firebase.getData();
    x.snapshotChanges().subscribe(item => {
      this.allCards = [];
      item.forEach((element, index)=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.allCards.push(y as Card);        
      });
      this.allCards.reverse()
    });
  }

  ngAfterContentChecked() {
  }

  getAllCards(){
    this.dataServ.getAllCards()
	  .subscribe(
                data => this.allCards = data,
                errorCode =>  this.statusCode = errorCode
              );   
  }
}
