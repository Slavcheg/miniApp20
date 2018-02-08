import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { InstagramService } from '../services/instagram.service';
import { DatabaseService } from '../services/database.service';
import { FirebaseService } from '../services/firebase.service';

//Model
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
    private instaAPI: InstagramService,
    private firebase: FirebaseService
  ) { 
 
  }
  /*
  ngOnInit() {
    this.getAllCards();
  }
*/

  ngOnInit() {
    var x = this.firebase.getData();
    x.snapshotChanges().subscribe(item => {
      this.allCards = [];
      item.forEach((element, index)=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.allCards.push(y as Card);
      });
    });
  }

  getAllCards(){
    this.dataServ.getAllCards()
	  .subscribe(
                data => this.allCards = data,
                errorCode =>  this.statusCode = errorCode
              );   
  }
}
