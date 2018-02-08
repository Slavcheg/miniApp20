import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';

//Set-ups
import { CardComponent } from './card/card.component';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'

// Classes
import {Card} from './models/card.model';

//Services
import { DatabaseService } from './services/database.service';
import { InstagramService } from './services/instagram.service';
import { FirebaseService } from './services/firebase.service';

//Drawings
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FormComponent } from './form/form.component';
import { BigviewComponent } from './bigview/bigview.component';

// Firebase db
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

const routes: Routes = [
      {path: '', component: BigviewComponent },
      {path: 'admin', component: CardComponent} ,
      { path: '**', redirectTo: '' }
      ]

@NgModule({
  imports: [     
      BrowserModule,

      BrowserAnimationsModule,
      FormsModule,
      MatInputModule, MatButtonModule, MatCardModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      
      FormsModule,

      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,

      HttpModule,
      RouterModule.forRoot(routes),

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
        InstagramService,
        FirebaseService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 
