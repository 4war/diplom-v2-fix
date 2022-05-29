import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GetFactoryListComponent} from "./factory/list/get-factory-list.component";
import {PostFactoryComponent} from "./factory/post/post-factory.component";
import {GetFactoryComponent} from "./factory/get/get-factory.component";
import {GetTournamentComponent} from "./tournament/get-tournament.component";
import {GetPlayerListComponent} from "./player/list/get-player-list.component";
import {GetPlayerComponent} from "./player/get/get-player.component";
import {PlayerOverviewComponent} from "./player/get/overview/overview.component";
import {GetPlayerTournamentsComponent} from "./player/get/tournaments/get-player-tournaments.component";
import {PlayerListComponent} from "./tournament/player-list/player-list.component";
import {BracketComponent} from "./tournament/bracket/bracket.component";
import {ScheduleComponent} from "./tournament/schedule/schedule.component";
import {TournamentOverviewComponent} from "./tournament/overview/tournament-overview.component";
import {SingleMatchOverviewComponent} from "./single-match/single-match.component";
import {NewsComponent} from "./news/news.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileUserSettingsComponent} from "./profile/settings/profile-user-settings.component";
import {ProfileUserMatchesComponent} from "./profile/matches/profile-user-matches.component";
import {ProfileUserTournamentsComponent} from "./profile/tournaments/profile-user-tournaments.component";
import {ProfileUserOverviewComponent} from "./profile/overview/profile-user-overview.component";
import {ProfileUserNotificationsComponent} from "./profile/notifications/profile-user-notifications.component";
import {ProfileUserTestComponent} from "./profile/test/profile-user-test.component";
import {TournamentRegisterComponent} from "./tournament/register/tournament-register.component";

  export const appRoutes: Routes = [
    {path: 'news', component: NewsComponent},
    {path: 'auth/login', component: LoginComponent},
    {path: 'auth/register', component: RegisterComponent},
    {path: 'factory/list', component: GetFactoryListComponent},
    {path: 'factory/post', component: PostFactoryComponent},
    {path: 'factory/:id', component: GetFactoryComponent},
    {path: 'tournament/:id', component: GetTournamentComponent,
      children: [
        {path: 'bracket', component: BracketComponent, children: [
            {path: 'match/:idMatch', component: SingleMatchOverviewComponent},
          ]},
        {path: 'playerList', component: PlayerListComponent},
        {path: 'schedule', component: ScheduleComponent},
        {path: 'overview', component: TournamentOverviewComponent},
        {path: 'register', component: TournamentRegisterComponent},
        {path: '', redirectTo: 'overview', pathMatch: 'full'},
        {path: 'get', redirectTo: 'overview', pathMatch: 'full'},
      ],
    },
    {path: 'player/list', component: GetPlayerListComponent},
    {path: 'player/:rni', component: GetPlayerComponent,
      children: [
        {path: 'overview', component: PlayerOverviewComponent},
        {path: 'matches', component: ProfileUserMatchesComponent},
        {path: 'tournaments', component: GetPlayerTournamentsComponent},
        {path: '', redirectTo: 'overview', pathMatch: 'full'},
      ],
    },
    {path: 'profile', component: ProfileComponent,
      children: [
        {path: 'overview', component: ProfileUserOverviewComponent},
        {path: 'matches', component: ProfileUserMatchesComponent},
        {path: 'tournaments', component: ProfileUserTournamentsComponent},
        {path: 'test', component: ProfileUserTestComponent},
        {path: 'notifications', component: ProfileUserNotificationsComponent},
        {path: 'settings', component: ProfileUserSettingsComponent},
        {path: '', redirectTo: 'overview', pathMatch: 'full'},
      ],},
    {path: '', redirectTo: '/factory/list', pathMatch: 'full'},
  ];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
