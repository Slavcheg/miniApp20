import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Card } from '../models/card.model';

@Injectable()
export class InstagramService {
    //URL for CRUD operations
    cardUrl = "http://localhost:3000/cards";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }

    getPostByCode(code: string): Observable<Card>{
        var postUrl = 'https://www.instagram.com/p/';
        //var code = 'BdvFNcOH-75';
        var url = postUrl + code
        var _body
        
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(postUrl + code);

        return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);
    }
        

    private extractData(res: Response) {            
        var dataExp = /window\._sharedData\s?=\s?({.+);<\/script>/;
        let _body
            for(var key in res)
            {
                if(key === "_body")
                {
                    _body = res[key]
                }
            }
        _body = _body.match(dataExp)[1]
        console.log(JSON.parse(_body).entry_data.PostPage[0].graphql.shortcode_media)
        return ({
            pro_pic: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.owner.profile_pic_url,
            full_name: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.owner.full_name,
            date: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.taken_at_timestamp,
            post_pic: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.display_resources[0].src,
            caption: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.edge_media_to_caption.edges[0].node.text,
            likes: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.edge_media_preview_like.count,
            comments: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.edge_media_to_comment.count,
            id: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.shortcode,
            username: JSON.parse(_body)
                .entry_data.PostPage[0].graphql.shortcode_media.shortcode

            })
        
        }
    
        private handleError (error: Response | any) {
            console.error(error.message || error);
            return Observable.throw(error.status);
            }
    
    
    }

    