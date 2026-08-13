import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about.component';
import { GameDetailComponent } from './pages/game-detail.component';
import { GamePlayComponent } from './pages/game-play.component';
import { GamesComponent } from './pages/games.component';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { PricingComponent } from './pages/pricing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'BrainBoost · Aprende jugando' },
  { path: 'games', component: GamesComponent, title: 'Juegos · BrainBoost' },
  { path: 'games/:id/play', component: GamePlayComponent, title: 'Jugar · BrainBoost' },
  { path: 'games/:id', component: GameDetailComponent, title: 'Detalle del juego · BrainBoost' },
  { path: 'pricing', component: PricingComponent, title: 'Precios · BrainBoost' },
  { path: 'about', component: AboutComponent, title: 'Nosotros · BrainBoost' },
  { path: 'login', component: LoginComponent, title: 'Acceder · BrainBoost' },
  { path: '**', redirectTo: '' },
];
