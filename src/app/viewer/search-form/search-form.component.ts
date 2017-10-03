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
            .debounceTime(this.debounceDelay)
            .subscribe(( event: KeyboardEvent ) => this.searchSubreddit((<HTMLInputElement>event.target).value));
    }

    submit(searchForm: NgForm) {
        this.updateSubreddit.emit(this.subredditInput);
    }

    searchSubreddit(newSub: string) {
       this.api.searchSubreddits(newSub)
            .then(response => {
                console.log('searched!');
                console.log(response);
            });
    }
}
