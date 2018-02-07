import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';

//Set-ups
import { CardComponent } from './card/card.component';
import { HttpModule } from '@angular/http';

//Drawings
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';


@NgModule({
  imports: [     
      BrowserModule,

      BrowserAnimationsModule,
      FormsModule,
      MatInputModule, MatButtonModule, MatCardModule,
      ReactiveFormsModule,
      FlexLayoutModule,

      HttpModule
  ],
  declarations: [
      AppComponent,
	ArticleComponent,
	CardComponent
  ],
  providers: [
        ArticleService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 
