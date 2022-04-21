import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetFactoryListComponent} from "./factory/list/get-factory-list.component";
import {PostFactoryComponent} from "./factory/post/post-factory.component";
import {GetFactoryComponent} from "./factory/get/get-factory.component";
import {OverviewComponent} from "./factory/get/overview/overview.component";
import {GetTournamentComponent} from "./tournament/get/get-tournament.component";
import {GetPlayerListComponent} from "./player/list/get-player-list.component";
import {GetPlayerComponent} from "./player/get/get-player.component";

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
      {path: 'tournament/:id', component: GetTournamentComponent},
    ],
  },

  {path: 'player/list', component: GetPlayerListComponent},
  {path: 'player/:id', component: GetPlayerComponent},

  {path: '', redirectTo: '/factory/list', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
