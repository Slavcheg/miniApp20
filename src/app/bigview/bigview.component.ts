import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InstagramService } from '../services/instagram.service';
import { DatabaseService } from '../services/database.service';
import {Card} from '../models/card.model';

@Component({
  selector: 'bigview',
  templateUrl: './bigview.component.html',
  styleUrls: ['./bigview.component.css']
})
export class BigviewComponent implements OnInit {

  allCards: Card[];
  
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
    private instaAPI: InstagramService) { 
 
  }
  ngOnInit() {
    this.getAllCards();
  }

  getAllCards(){
    this.dataServ.getAllCards()
	  .subscribe(
                data => this.allCards = data,
                errorCode =>  this.statusCode = errorCode
              );   
  }
}
