import {Routes} from "@angular/router";
import {PostFactoryComponent} from "./app/tournament/post/post-factory.component";
import {GetPlayerListComponent} from "./app/player/get-player-list.component";
import {GetFactoryListComponent} from "./app/tournament/get-factory-list/get-factory-list.component";
import {GetFactoryComponent} from "./app/tournament/get-factory/get-factory.component";
import {OverviewComponent} from "./app/tournament/get-factory/overview/overview.component";
import {GetTournamentComponent} from "./app/tournament/get-factory/get-tournament/get-tournament.component";

export const appRoutes: Routes = [
  {path: 'factory/list', component: GetFactoryListComponent},
  {path: 'factory/post', component: PostFactoryComponent},

 // {path: 'factory/tournament', component: GetTournamentComponent},

  {
    path: 'factory/get',
    component: GetFactoryComponent,
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'tournament', component: GetTournamentComponent},
    ],
  },

  {path: 'player/list', component: GetPlayerListComponent},

  {path: '', redirectTo: '/factory/list', pathMatch: 'full'},
];
