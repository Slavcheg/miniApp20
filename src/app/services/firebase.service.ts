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
    this.cardList = this.firebase.list('employees');
    return this.cardList
  }

  insertCard(card : Card)
  {
    console.log("fire save")
    this.cardList.push(card);
       console.log("fire sent")
  }

}