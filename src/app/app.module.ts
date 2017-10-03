import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ViewerComponent, ViewerService } from './viewer';
import { SearchFormComponent } from './viewer/search-form/search-form.component';
import { PostListComponent } from './viewer/post-list/post-list.component';
import { PostComponent } from './viewer/post/post.component';
import { TimeDistancePipe } from './viewer/time-distance.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    SearchFormComponent,
    PostListComponent,
    PostComponent,
    TimeDistancePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
    providers: [
        ViewerService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
