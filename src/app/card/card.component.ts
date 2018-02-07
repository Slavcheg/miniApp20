import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InstagramService } from '../services/instagram.service';
import { DatabaseService } from '../services/database.service';
import {Card} from '../models/card.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

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

    this._card = {
      
    id: 'asdds',
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


  getAllCards(){
    this.dataServ.getAllCards()
	  .subscribe(
                data => this.allCards = data,
                errorCode =>  this.statusCode = errorCode
              );   
  }

  onLoad(postId: string){
      //this.preProcessConfigurations();
      this.instaAPI.getPostByCode(postId)
     .subscribe(article => {
              //this.articleIdToUpdate = article.id;   
              //this.cardForm.setValue({ title: article.title, category: article.category });
        this._card = article
        this.processValidation = true;
        this.requestProcessing = false;   
     },
           errorCode =>  this.statusCode = errorCode);   
   }

  onCardFormSubmit(){
    console.log("Save card: start");

    let card = this._card;
    this.dataServ.getAllCards()
    .subscribe(articles => {
   /*
      this.processValidation = true;   
      if (this.cardForm.invalid) {
           return; //Validation failed, exit from method.
      }  
      */
   //Generate article id	 
    //let maxIndex = articles.length - 1;
    //let articleWithMaxIndex = articles[maxIndex];
    //let articleId = articleWithMaxIndex.id + 1;
    //article.id = articleId;
   
   //Create article
              this.dataServ.createCard(card)
    .subscribe(successCode => {
       this.statusCode = successCode;
       this.getAllCards();	
        this.backToCreateArticle();
       this.cardForm.reset()
     },
     errorCode => console.log(errorCode) //this.statusCode = errorCode
     );
 });
  }

     //Delete article
     deleteCard(cardId: string) {
      this.preProcessConfigurations();
      this.dataServ.deleteCardById(cardId)
	      .subscribe(successCode => {
		  //this.statusCode = successCode;
	  	  //Expecting success code 204 from server
		  this.statusCode = 204;
		  this.getAllCards();	
		  this.backToCreateArticle();
		},
		errorCode => this.statusCode = errorCode);    
   }



  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
 }

  backToCreateArticle(){
    this.articleIdToUpdate = null;
    this.cardForm.reset();	  
    this.processValidation = false;

  };
}
