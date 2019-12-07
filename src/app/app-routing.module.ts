import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-player' },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'edit-player/:id', component: EditPlayerComponent },
  { path: 'player-list', component: PlayerListComponent },
  { path: 'join-game/:id', component: JoinGameComponent },
  { path: 'player-rankings', component: PlayerRankingsComponent },
  { path: 'game-list', component: GameListComponent },
  { path: 'add-game', component: AddGameComponent },
  { path: 'edit-game/:id', component: EditGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }