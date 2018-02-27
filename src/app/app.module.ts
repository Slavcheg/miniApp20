import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';

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

import { DragScrollModule } from 'ngx-drag-scroll';

const routes: Routes = [
      {
        path: '', component: AppComponent,
        children: [
          { path: '', component: BigviewComponent },
          { path: 'admin', component: CardComponent }
        ]
      },
      { path: '**', redirectTo: '' }
    ];

    import {MasonryModule} from '../angular2-masonry'

    import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

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

      MasonryModule,
      BrowserAnimationsModule,
      DragScrollModule,
      NgxCarouselModule

  ],
  declarations: [
      AppComponent,
	CardComponent,
      FormComponent,
      BigviewComponent
  ],
  providers: [
        Card,
        DatabaseService,
        InstagramService,
        FirebaseService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        { provide: LOCALE_ID, useValue: "de" }
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { } 
