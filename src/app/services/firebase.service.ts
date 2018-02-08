import { Injectable } from '@angular/core';

import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';

import { Card } from '../models/card.model';

@Injectable()
export class FirebaseService {
  cardList: AngularFireList<any>;
  //selectedEmployee: InstaData = new InstaData();
  //employee: InstaData;

  constructor(private firebase: AngularFireDatabase) { }

  getData(){
    this.cardList = this.firebase.list('posts');
    return this.cardList
  }

  insertCard(card : Card)
  {

    this.cardList.push({
      id: card.id,
      pro_pic: card.post_pic,
      full_name: card.full_name,
      date: card.date,
      post_pic: card.post_pic,
      caption: card.caption,
      likes: card.likes,
      comments: card.comments,
      username: card.username
    });
       
  }

  findEmployeeKeyByName(cId: string){
    var empKey;
    console.log(cId);
    var x = this.getData();
    x.snapshotChanges().subscribe(item => {
      item.forEach((element, index)=>{
        var y = element.payload.toJSON();
        if (y["$key"] == cId)
          empKey = element.key
      })
    })
    return empKey
  }

  deleteEmployee($key : string){
    this.cardList.remove($key);
  }

}