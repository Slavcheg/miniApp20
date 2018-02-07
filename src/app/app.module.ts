import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';

//Set-ups
import { CardComponent } from './card/card.component';
import { HttpModule } from '@angular/http';

// Classes
import {Card} from './models/card.model';

//Services
import { DatabaseService } from './services/database.service';

//Drawings
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FormComponent } from './form/form.component';


@NgModule({
  imports: [     
      BrowserModule,

      BrowserAnimationsModule,
      FormsModule,
      MatInputModule, MatButtonModule, MatCardModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      
      FormsModule,

      HttpModule
  ],
  declarations: [
      AppComponent,
	ArticleComponent,
	CardComponent,
	FormComponent
  ],
  providers: [
        ArticleService,
        Card,
        DatabaseService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 
