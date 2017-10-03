import { Component, OnInit } from '@angular/core';
import { ViewerService } from './viewer.service';
import { Post } from './post.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

    subreddit = 'nyc';
    posts: Post[];
    constructor(private api: ViewerService) {

    }

    ngOnInit() {
        this.getPosts();
    }

    onUpdateSubreddit(newSubreddit: string) {
        this.subreddit = newSubreddit;
        this.getPosts();
    }

    getPosts() {
        this.api.getPostsFor(this.subreddit)
            .then(posts => this.posts = posts);
    }
}
