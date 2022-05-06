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

export const appRoutes: Routes = [
  {path: 'factory/list', component: GetFactoryListComponent},
  {path: 'factory/post', component: PostFactoryComponent},
  {path: 'factory/:id', component: GetFactoryComponent},

  {
    path: 'tournament/:id',
    component: GetTournamentComponent,
    children: [
      {path: 'bracket', component: BracketComponent, children: [
          {path: 'match/:idMatch', component: SingleMatchOverviewComponent},
        ]},
      {path: 'playerList', component: PlayerListComponent},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'overview', component: TournamentOverviewComponent},
    ],
  },

  {path: 'player/list', component: GetPlayerListComponent},
  {
    path: 'player/:rni',
    component: GetPlayerComponent,
    children: [
      {path: 'overview', component: PlayerOverviewComponent},
      //todo: {path: 'matches', component: GetPlayerMatchesComponent},
      {path: 'tournaments', component: GetPlayerTournamentsComponent},
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
    ],
  },

  {path: '', redirectTo: '/factory/list', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
