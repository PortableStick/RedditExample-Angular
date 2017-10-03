import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Post } from './post.model';

@Injectable()
export class ViewerService {

    redditApi: string;

    constructor(private http: Http) {
        this.redditApi = 'https://api.reddit.com';
    }

    getPostsFor(subreddit: string): Promise<Post[]> {
        return this.http.get(`${this.redditApi}/r/${subreddit}/new`)
            .map(response => response.json())
            .map(data => data.data.children)
            .map(children => children.map(child => child.data as Post))
            .map(posts => posts.map(post => ({...post, created_utc: post.created_utc * 1000})))
            .toPromise();
    }

    searchSubreddits(query: string): Promise<any> {
        return this.http.get(`${this.redditApi}/search?q=${query}&type=sr`)
            .map(response => response.json())
            .map(data => data.data.children)
            .map(children => children.map(child => child.data.display_name_prefixed))
            .toPromise();
    }
}
