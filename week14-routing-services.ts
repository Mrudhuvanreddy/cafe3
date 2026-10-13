import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CafeService, IMenuItem, ICafeOrder } from './cafe.service';

/**
 * Week 14: Angular Single-Page Application (SPA) with Routing and Services
 * Demonstrates:
 * 1. Angular Router for client-side navigation without page refresh
 * 2. <router-outlet> for dynamic component rendering
 * 3. Singleton Service (CafeService) with Dependency Injection via constructor
 * 4. Cross-component shared state
 */
@Component({
  selector: 'app-week14-spa',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './week14-routing-services.html',
  styleUrls: ['./style.css']
})
export class Week14Component implements OnInit {
  cafeInfo: any;
  menu: IMenuItem[] = [];
  orders: ICafeOrder[] = [];

  // 1. Dependency Injection of CafeService singleton
  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    // 2. Fetch shared data from service
    this.cafeInfo = this.cafeService.getCafeInfo();
    this.menu = this.cafeService.getMenu();
    this.orders = this.cafeService.getOrders();
  }
}
