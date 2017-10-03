import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ViewerService } from '../viewer.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
    subreddits: string[];
    subredditInput: string;
    searchEvent: Observable<any>;
    debounceDelay: number;
    @ViewChild('searchForm') searchForm: NgForm;
    @ViewChild('searchInput') searchInput: ElementRef;
    @Output() updateSubreddit: EventEmitter<string> = new EventEmitter<string>();

    constructor(private api: ViewerService) {
        this.debounceDelay = 300;
    }

    ngOnInit() {
        Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
            .map(( event: KeyboardEvent ) => (<HTMLInputElement>event.target).value)
            .filter(( input: string ) => input.length > 2)
            .debounceTime(this.debounceDelay)
            .subscribe(( searchTerm: string ) => this.searchSubreddit(searchTerm));
    }

    submit(searchForm: NgForm) {
        this.updateSubreddit.emit(this.subredditInput);
        this.searchForm.resetForm();
    }

    searchSubreddit(newSub: string) {
       this.api.searchSubreddits(newSub)
            .then(response => {
               this.subreddits = response;
            });
    }

    setSubreddit(event: MouseEvent) {
        const sub = (<HTMLInputElement>event.target).innerText.replace('r/', '');
        this.subredditInput = sub;
        this.subreddits = [];
    }
}
