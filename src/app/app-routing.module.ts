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
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-rankings', canActivate: [AuthGuard] },
  { path: 'add-player', component: AddPlayerComponent, canActivate: [AuthGuard] },
  { path: 'edit-player/:id', component: EditPlayerComponent, canActivate: [AuthGuard] },
  { path: 'player-list', component: PlayerListComponent, canActivate: [AuthGuard] },
  { path: 'join-game/:id', component: JoinGameComponent, canActivate: [AuthGuard] },
  { path: 'player-rankings', component: PlayerRankingsComponent, canActivate: [AuthGuard] },
  { path: 'game-list', component: GameListComponent, canActivate: [AuthGuard] },
  { path: 'add-game', component: AddGameComponent, canActivate: [AuthGuard] },
  { path: 'edit-game/:id', component: EditGameComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }