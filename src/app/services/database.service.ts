import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Card } from '../models/card.model';

@Injectable()
export class DatabaseService {
    //URL for CRUD operations
    cardUrl = "http://localhost:3000/cards";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all articles
    getAllCards(): Observable<Card[]> {
        return this.http.get(this.cardUrl)
	   .map(this.extractData)
	   .catch(this.handleError);

    }
    //Create article
    createCard(card: Card):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.cardUrl, card, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch article by id
    getCardById(cardId: string): Observable<Card> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: cpHeaders });
	console.log(this.cardUrl +"/"+ cardId);
	return this.http.get(this.cardUrl +"/"+ cardId)
	   .map(this.extractData)
	   .catch(this.handleError);
    }	
    //Update article
    updateCard(card: Card):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.cardUrl +"/"+ card.id, card, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete article	
    deleteCardById(card: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: cpHeaders });
	return this.http.delete(this.cardUrl +"/"+ card)
	       .map(success => success.status)
               .catch(this.handleError);
    }	
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 