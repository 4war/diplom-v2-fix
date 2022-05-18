import {ChangeDetectorRef, LOCALE_ID, NgModule} from '@angular/core';
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
import {FormBuilder, FormsModule} from "@angular/forms";
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
import {MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {PostFactoryComponent} from "./factory/post/post-factory.component";
import {GetPlayerListComponent} from "./player/list/get-player-list.component";
import {GetFactoryListComponent} from "./factory/list/get-factory-list.component";
import {GetTournamentComponent} from "./tournament/get-tournament.component";
import {DragScrollModule} from "ngx-drag-scroll";
import {PostPlayerComponent} from "./player/post/post-player.component";
import {GetPlayerComponent} from "./player/get/get-player.component";
import {PlayerService} from "./services/player.service";
import {PlayerOverviewComponent} from "./player/get/overview/overview.component";
import {GetPlayerTournamentsComponent} from './player/get/tournaments/get-player-tournaments.component';
import {PlayerListComponent} from './tournament/player-list/player-list.component';
import {BracketComponent} from './tournament/bracket/bracket.component';
import {ScheduleComponent} from './tournament/schedule/schedule.component';
import {GetFactoryComponent} from "./factory/get/get-factory.component";
import {TournamentOverviewComponent} from "./tournament/overview/tournament-overview.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {BracketService} from "./services/bracket.service";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DragAndDropService} from "./services/viewServices/drag-and-drop.service";
import {SingleMatchComponent} from "./tournament/bracket/single-match-preview/single-match.component";
import {PlayerComponent} from "./tournament/bracket/single-match-preview/player/player.component";
import {SingleMatchOverviewComponent} from "./single-match/single-match.component";
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {Match} from "./shared/Match";
import {DigitComponent} from './single-match/digit/digit.component';
import {WinDialogComponent} from "./single-match/win-dialog/win-dialog.component";
import {PlayerInMatchDialogComponent} from "./single-match/player/player.component";
import {
  SeekPlayerDialogComponent,
  SeekSettings
} from "./helpComponents/seek-player-dialog/seek-player-dialog.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {DurationComponent} from './single-match/duration/duration.component';
import {NgbModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { AlreadyExistDialogComponent } from './tournament/player-list/already-exist-dialog/already-exist-dialog.component';
import {Player} from "./shared/Player";
import {MatRadioModule} from "@angular/material/radio";
import {MatTabsModule} from "@angular/material/tabs";
import { MatchInScheduleComponent } from './tournament/schedule/match-in-schedule/match-in-schedule.component';
import {NouisliderModule} from "ng2-nouislider";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { NewsComponent } from './news/news.component';
import {NewsService} from "./services/news.service";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {ACCESS_TOKEN_KEY} from "./services/auth.service";
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUserSettingsComponent } from './profile/settings/profile-user-settings.component';
import { ProfileUserMatchesComponent } from './profile/matches/profile-user-matches.component';
import { ProfileUserTournamentsComponent } from './profile/tournaments/profile-user-tournaments.component';
import { ProfileUserOverviewComponent } from './profile/overview/profile-user-overview.component';
import { ProfileOverviewHeatmapComponent } from './profile/overview/heatmap/profile-overview-heatmap.component';
import { ProfileOverviewTriangleComponent } from './profile/overview/triangle/profile-overview-triangle.component';
import { ProfileOverviewFioComponent } from './profile/overview/fio/profile-overview-fio.component';
import { ProfileOverviewStatisticsComponent } from './profile/overview/statistics/profile-overview-statistics.component';
import { ProfileUserNotificationsComponent} from "./profile/notifications/profile-user-notifications.component";
import {MatBadgeModule} from "@angular/material/badge";

registerLocaleData(localeRu);

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    PostFactoryComponent,
    GetPlayerListComponent,
    GetFactoryListComponent,
    GetTournamentComponent,
    SingleMatchComponent,
    PostPlayerComponent,
    GetPlayerComponent,
    PlayerOverviewComponent,
    GetPlayerTournamentsComponent,
    PlayerListComponent,
    BracketComponent,
    ScheduleComponent,
    TournamentOverviewComponent,
    GetFactoryComponent,
    PlayerComponent,
    SingleMatchOverviewComponent,
    DigitComponent,
    PlayerInMatchDialogComponent,
    WinDialogComponent,
    SeekPlayerDialogComponent,
    DurationComponent,
    AlreadyExistDialogComponent,
    MatchInScheduleComponent,
    NewsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileUserSettingsComponent,
    ProfileUserMatchesComponent,
    ProfileUserTournamentsComponent,
    ProfileUserOverviewComponent,
    ProfileOverviewHeatmapComponent,
    ProfileOverviewTriangleComponent,
    ProfileOverviewFioComponent,
    ProfileOverviewStatisticsComponent,
    ProfileUserNotificationsComponent,
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
    MatProgressBarModule,
    DragDropModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    NgbModule,
    NgbTimepickerModule,
    MatRadioModule,
    MatTabsModule,
    NouisliderModule,
    NgxSliderModule,
    MatCarouselModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains,
      }
    }),
    MatBadgeModule
  ],
  entryComponents: [SingleMatchOverviewComponent],
  providers:
    [FormBuilder, RouterModule, GeneralService, MatDrawerContainer, MatDialogConfig,
      {provide: MAT_DATE_FORMATS, useValue: MyFormats},
      {provide: MAT_DIALOG_DATA, useClass: Match},
      {provide: MAT_DIALOG_DATA, useClass: SeekSettings},
      {provide: MAT_DIALOG_DATA, useClass: Player},
      {provide: DateAdapter, useClass: CustomDateAdapter},
      {provide: LOCALE_ID, useValue: 'ru'},
      TournamentService, PlayerService, BracketService, DragAndDropService, NewsService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
