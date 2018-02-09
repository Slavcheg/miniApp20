import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Services
import { InstagramService } from '../services/instagram.service';
import { DatabaseService } from '../services/database.service';
import { FirebaseService } from '../services/firebase.service';

//Model
import {Card} from '../models/card.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  allCards: Card[];
  _card: Card
  
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

  constructor(
    private dataServ: DatabaseService,
    private instaAPI: InstagramService,
    private firebase: FirebaseService
    ) { 
 
  }
/*
  ngOnInit() {

    this.getAllCards();

    this._card = {
      
       pro_pic : "https://instagram.fsof3-1.fna.fbcdn.net/vp/b8bd4522b2a8be04fd2078104bb2c392/5B1ACB82/t51.2885-19/11248209_1451199795176849_1901894346_a.jpg",
       full_name : "MINI",
       date : 1517824799,
       post_pic : "https://instagram.fsof3-1.fna.fbcdn.net/vp/d1d44756bbefeef58aa08e4fc9a45ea5/5B0E7798/t51.2885-15/s640x640/sh0.08/e35/27575182_398672613894009_7270277397490958336_n.jpg",
       caption : "A #ClassicMini spotted by @wiley.putnam in #London. #MINIMonday #MINIgram #MINIfan.",
       likes : 18563,
       comments : 51,
       id : "Bez5S1jgQvC",
       username: "mini"
      }
  }
*/
  ngOnInit(){

    this._card = {
      
      $key: "",
      pro_pic : "https://instagram.fsof3-1.fna.fbcdn.net/vp/b8bd4522b2a8be04fd2078104bb2c392/5B1ACB82/t51.2885-19/11248209_1451199795176849_1901894346_a.jpg",
      full_name : "MINI",
      date : 1517824799,
      post_pic : "https://instagram.fsof3-1.fna.fbcdn.net/vp/d1d44756bbefeef58aa08e4fc9a45ea5/5B0E7798/t51.2885-15/s640x640/sh0.08/e35/27575182_398672613894009_7270277397490958336_n.jpg",
      caption : "A #ClassicMini spotted by @wiley.putnam in #London. #MINIMonday #MINIgram #MINIfan.",
      likes : 63,
      comments : 0,
      id : "Bez5S1jgQvC",
      username: "mini"
     }

    var x = this.firebase.getData();
    x.snapshotChanges().subscribe(item => {
      this.allCards = [];
      item.forEach((element, index)=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.allCards.push(y as Card);
        //this.employeeList[element.]
        //console.log(element.key)
        //console.log(this.employeeList[index].name)
        //this.getPost(this.employeeList[index].name)
      });
      this.allCards.reverse()
      //this.allCards.forEach(y=>{
        //this.onLoad(y.id)
      //})
    });
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
        console.log(this._card)
        this.processValidation = true;
        this.requestProcessing = false;   
     },
           errorCode =>  this.statusCode = errorCode);   
   }

   onCardSubmit(){
     console.log("On submit")
    this.firebase.insertCard(this._card);
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
/*
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
*/

deleteCard(key: string){
  if (true) {
    //var s = this.firebase.findEmployeeKeyByName(key)
    this.firebase.deleteEmployee(key);
    //this.tostr.warning("Deleted Successfully", "Employee register");
  }
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
