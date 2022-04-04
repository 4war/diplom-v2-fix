import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {appRoutes} from "../routes";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostFactoryComponent} from './tournament/post/post-factory.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {GetPlayerListComponent} from './player/get-player-list.component';
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import {MyFormats} from "./MyFormats";
import {ReactiveFormsModule} from "@angular/forms";

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {TournamentService} from "./services/tournament.service";
import {HttpClientModule} from "@angular/common/http";
import {GetFactoryListComponent} from "./tournament/get-factory-list/get-factory-list.component";
import {MatTableModule} from "@angular/material/table";
import {CustomDateAdapter} from "./shared/viewModels/CustomDateAdapter";
import {GeneralService} from "./services/general.service";
import {MatSortModule} from "@angular/material/sort";
import { GetFactoryComponent } from './tournament/get-factory/get-factory.component';
import { GetTournamentComponent} from "./tournament/get-factory/get-tournament/get-tournament.component";
import { OverviewComponent} from "./tournament/get-factory/overview/overview.component";
import {MatTreeModule} from "@angular/material/tree";
import {NgTournamentTreeModule} from "ng-tournament-tree";
import { SingleMatchComponent } from './single-match/single-match.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    PostFactoryComponent,
    GetPlayerListComponent,
    GetFactoryListComponent,
    GetFactoryComponent,
    GetTournamentComponent,
    OverviewComponent,
    SingleMatchComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatListModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        HttpClientModule,
        MatTableModule,
        MatSortModule,
        MatTreeModule,
        NgTournamentTreeModule
    ],
  providers:
    [FormBuilder, RouterModule, GeneralService,
      {provide: MAT_DATE_FORMATS, useValue: MyFormats},
      {provide: DateAdapter, useClass: CustomDateAdapter},
      {provide: LOCALE_ID, useValue: 'ru'},
      TournamentService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
