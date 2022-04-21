import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {appRoutes, AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
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
import {MatTableModule} from "@angular/material/table";
import {CustomDateAdapter} from "./shared/viewModels/CustomDateAdapter";
import {GeneralService} from "./services/general.service";
import {MatSortModule} from "@angular/material/sort";
import {MatTreeModule} from "@angular/material/tree";
import {NgTournamentTreeModule} from "ng-tournament-tree";
import {SingleMatchComponent} from './single-match/single-match.component';
import {SingleMatchPreviewComponent} from './single-match-preview/single-match-preview.component';
import {MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {PostFactoryComponent} from "./factory/post/post-factory.component";
import {GetPlayerListComponent} from "./player/list/get-player-list.component";
import {GetFactoryListComponent} from "./factory/list/get-factory-list.component";
import {GetFactoryComponent} from "./factory/get/get-factory.component";
import {OverviewComponent} from "./factory/get/overview/overview.component";
import {GetTournamentComponent} from "./tournament/get/get-tournament.component";
import {DragScrollModule} from "ngx-drag-scroll";
import {PostPlayerComponent} from "./player/post/post-player.component";
import { GetPlayerComponent} from "./player/get/get-player.component";
import {PlayerService} from "./services/player.service";
import {PlayerOverviewComponent} from "./player/get/overview/overview.component";

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
    SingleMatchPreviewComponent,
    PostPlayerComponent,
    GetPlayerComponent,
    PlayerOverviewComponent,
  ],
  imports: [
    MatSidenavModule,
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
    NgTournamentTreeModule,
    DragScrollModule,
  ],
  providers:
    [FormBuilder, RouterModule, GeneralService, MatDrawerContainer,
      {provide: MAT_DATE_FORMATS, useValue: MyFormats},
      {provide: DateAdapter, useClass: CustomDateAdapter},
      {provide: LOCALE_ID, useValue: 'ru'},
      TournamentService, PlayerService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
