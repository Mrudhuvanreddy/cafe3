import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CafeService, IMenuItem, ICafeOrder, ICustomerMember } from './cafe.service';

/**
 * 1. Home View Component (Route: /home)
 * Uses CafeService to load featured items and cafe information.
 */
@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="route-view">
      <h3>Welcome to {{ cafeInfo.name }}</h3>
      <p style="color: #64748b;">{{ cafeInfo.address }} • Open {{ cafeInfo.openHours }}</p>
      
      <h4>Chef's Top Specialties (Injected via CafeService)</h4>
      <div class="specialties-grid">
        <div *ngFor="let item of specialties" class="item-card">
          <h5>{{ item.name }}</h5>
          <p class="desc">{{ item.description }}</p>
          <div class="price">₹{{ item.price }}</div>
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <a routerLink="/order" class="btn-primary">Order Now via Angular Form →</a>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  cafeInfo: any;
  specialties: IMenuItem[] = [];

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.cafeInfo = this.cafeService.getCafeInfo();
    this.specialties = this.cafeService.getSpecialties();
  }
}

/**
 * 2. Menu View Component (Route: /menu)
 * Injects CafeService to display the entire menu with search and filter.
 */
@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="route-view">
      <h3>Complete Cafe Catalogue</h3>
      <p style="color: #64748b;">Loaded directly from Angular CafeService singleton.</p>
      
      <div class="menu-list">
        <div *ngFor="let item of menuItems" class="menu-row">
          <div>
            <strong>{{ item.name }}</strong> ({{ item.category }})
            <p style="font-size: 13px; color: #64748b; margin: 4px 0;">{{ item.description }}</p>
          </div>
          <div style="font-weight: bold; color: #0077b6;">₹{{ item.price }}</div>
        </div>
      </div>
    </div>
  `
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[] = [];

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.menuItems = this.cafeService.getMenu();
  }
}

/**
 * 3. Order & Registration Form Component (Route: /order) - Week 13
 * Demonstrates Template-Driven Angular Form with:
 * - [(ngModel)] two-way binding
 * - Form validation (required, minlength, email, pattern)
 * - Validation flags (valid, invalid, touched, dirty, pristine)
 * - Error alerts
 * - Form submit handler sending data to CafeService
 */
@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="route-view">
      <h3>Week 13: Angular Template-Driven Form</h3>
      <p style="color: #64748b;">
        Place an order or register membership. Validated using Angular form controls.
      </p>

      <form #cafeForm="ngForm" (ngSubmit)="onSubmit(cafeForm)" novalidate>
        <!-- Customer Name -->
        <div class="form-group">
          <label>Customer Full Name *</label>
          <input type="text" name="customerName" [(ngModel)]="formData.customerName"
                 required minlength="3" #nameCtrl="ngModel"
                 [class.input-error]="nameCtrl.invalid && nameCtrl.touched"
                 placeholder="e.g. John Doe">
          <div *ngIf="nameCtrl.invalid && nameCtrl.touched" class="error-text">
            Customer name is required (minimum 3 characters).
          </div>
        </div>

        <!-- Customer Email -->
        <div class="form-group">
          <label>Email Address *</label>
          <input type="email" name="email" [(ngModel)]="formData.email"
                 required email #emailCtrl="ngModel"
                 [class.input-error]="emailCtrl.invalid && emailCtrl.touched"
                 placeholder="e.g. john@example.com">
          <div *ngIf="emailCtrl.invalid && emailCtrl.touched" class="error-text">
            Please enter a valid email address.
          </div>
        </div>

        <!-- Phone Number -->
        <div class="form-group">
          <label>Phone Number (10 digits) *</label>
          <input type="tel" name="phone" [(ngModel)]="formData.phone"
                 required pattern="^[0-9]{10}$" #phoneCtrl="ngModel"
                 [class.input-error]="phoneCtrl.invalid && phoneCtrl.touched"
                 placeholder="10-digit mobile number">
          <div *ngIf="phoneCtrl.invalid && phoneCtrl.touched" class="error-text">
            Please enter a valid 10-digit mobile number.
          </div>
        </div>

        <!-- Menu Item Selection -->
        <div class="form-group">
          <label>Select Item *</label>
          <select name="itemName" [(ngModel)]="formData.itemName" required #itemCtrl="ngModel">
            <option value="" disabled selected>-- Choose from Menu --</option>
            <option *ngFor="let item of menuItems" [value]="item.name">
              {{ item.name }} (₹{{ item.price }})
            </option>
          </select>
        </div>

        <!-- Quantity & Table Number -->
        <div style="display: flex; gap: 15px;">
          <div class="form-group" style="flex: 1;">
            <label>Quantity *</label>
            <input type="number" name="quantity" [(ngModel)]="formData.quantity" min="1" max="20" required>
          </div>
          <div class="form-group" style="flex: 1;">
            <label>Table Number (1-30) *</label>
            <input type="number" name="tableNumber" [(ngModel)]="formData.tableNumber" min="1" max="30" required>
          </div>
        </div>

        <!-- Submit Button disabled if form is invalid -->
        <button type="submit" class="btn-primary" [disabled]="cafeForm.invalid" style="width: 100%;">
          Submit Order via Angular Form
        </button>
      </form>
    </div>
  `
})
export class OrderFormComponent implements OnInit {
  menuItems: IMenuItem[] = [];
  formData = {
    customerName: '',
    email: '',
    phone: '',
    itemName: 'Cappuccino',
    quantity: 1,
    tableNumber: 5,
    specialNotes: ''
  };

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.menuItems = this.cafeService.getMenu();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const selectedMenuItem = this.menuItems.find(m => m.name === this.formData.itemName);
      const unitPrice = selectedMenuItem ? selectedMenuItem.price : 100;
      const total = unitPrice * this.formData.quantity;

      this.cafeService.addOrder({
        customerName: this.formData.customerName,
        email: this.formData.email,
        phone: this.formData.phone,
        itemName: this.formData.itemName,
        quantity: this.formData.quantity,
        tableNumber: this.formData.tableNumber,
        specialNotes: this.formData.specialNotes,
        orderTotal: total
      });

      alert(`✅ Order confirmed for ${this.formData.customerName}!\nTotal: ₹${total}`);
      form.resetForm();
    }
  }
}

/**
 * 4. Orders Dashboard Component (Route: /dashboard)
 * Displays orders recorded in the singleton CafeService.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="route-view">
      <h3>Live Orders & Members (Managed by CafeService)</h3>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Item & Qty</th>
            <th>Table</th>
            <th>Total</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>#{{ order.id }}</td>
            <td>{{ order.customerName }}<br><small>{{ order.phone }}</small></td>
            <td>{{ order.itemName }} (x{{ order.quantity }})</td>
            <td>Table {{ order.tableNumber }}</td>
            <td>₹{{ order.orderTotal }}</td>
            <td>{{ order.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  orders: ICafeOrder[] = [];

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.orders = this.cafeService.getOrders();
  }
}

/**
 * 5. About Component (Route: /about)
 */
@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="route-view">
      <h3>About THE WAVE ☕ Cafe</h3>
      <p>THE WAVE Cafe is a premier specialty cafe established in 2026.</p>
      <p>We serve 100% single-origin Arabica coffee beans and fresh artisan baked goods.</p>
    </div>
  `
})
export class AboutComponent {}

/**
 * Main Single-Page Application (SPA) Root Component
 * Hosts the Navigation bar, <router-outlet>, and concept demonstrations.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './week13-14.html',
  styleUrls: ['./style.css']
})
export class Week1314Component {
  title = 'THE WAVE Cafe SPA (Weeks 13-14)';
}
