import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    @Input() post: Post;

    constructor() { }

    ngOnInit() {
    }

}
