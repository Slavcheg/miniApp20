import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';

//Set-ups
import { CardComponent } from './card/card.component';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'

// Classes
import {Card} from './models/card.model';

//Services
import { DatabaseService } from './services/database.service';
import { InstagramService } from './services/instagram.service';

//Drawings
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FormComponent } from './form/form.component';
import { BigviewComponent } from './bigview/bigview.component';

@NgModule({
  imports: [     
      BrowserModule,

      BrowserAnimationsModule,
      FormsModule,
      MatInputModule, MatButtonModule, MatCardModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      
      FormsModule,

      HttpModule,
      RouterModule.forRoot([
            {path: '', component: BigviewComponent},
            {path: 'admin', component: CardComponent},
            {path: '**', component: BigviewComponent}
      ])
  ],
  declarations: [
      AppComponent,
	ArticleComponent,
	CardComponent,
      FormComponent,
      BigviewComponent
  ],
  providers: [
        ArticleService,
        Card,
        DatabaseService,
        InstagramService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 
