import { Routes } from '@angular/router';
import { HomeComponent } from './week13-14.component';
import { MenuComponent } from './week13-14.component';
import { OrderFormComponent } from './week13-14.component';
import { DashboardComponent } from './week13-14.component';
import { AboutComponent } from './week13-14.component';

/**
 * Week 14: Angular Single-Page Application (SPA) Routes Configuration
 * Defines path mapping for client-side routing without full page reload.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'THE WAVE Cafe - Home' },
  { path: 'menu', component: MenuComponent, title: 'THE WAVE Cafe - Menu' },
  { path: 'order', component: OrderFormComponent, title: 'THE WAVE Cafe - Order & Register' },
  { path: 'dashboard', component: DashboardComponent, title: 'THE WAVE Cafe - Orders Dashboard' },
  { path: 'about', component: AboutComponent, title: 'THE WAVE Cafe - About Us' },
  { path: '**', redirectTo: 'home' } // Wildcard fallback
];
