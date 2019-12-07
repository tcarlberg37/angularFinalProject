import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    PlayerRankingsComponent,
    PlayerListComponent,
    EditPlayerComponent,
    JoinGameComponent,
    GameListComponent,
    AddGameComponent,
    EditGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
