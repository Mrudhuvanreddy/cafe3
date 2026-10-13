import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Interface representing a Cafe Menu Item
 */
export interface IMenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  description: string;
}

/**
 * Week 12: Angular Components, Data Binding & Directives
 * Demonstrates:
 * 1. Component declaration & metadata
 * 2. Data binding:
 *    - Interpolation: {{ cafeName }}, {{ totalAmount }}
 *    - Property Binding: [disabled]="isSubmitting", [src]="logoUrl"
 *    - Event Binding: (click)="addItem()", (input)="onSearch()"
 *    - Two-way Data Binding: [(ngModel)]="customerName"
 * 3. Directives:
 *    - Structural: *ngIf, *ngFor (with index, trackBy), *ngSwitch / *ngSwitchCase
 *    - Attribute: [ngClass], [ngStyle]
 */
@Component({
  selector: 'app-week12',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './week12.html',
  styleUrls: ['./style.css']
})
export class Week12Component {
  // 1. Interpolation properties
  cafeName: string = 'THE WAVE ☕ Cafe';
  tagline: string = 'Fresh Coffee • Delicious Food • Cozy Atmosphere';
  labTitle: string = 'Week 12: Angular Components, Data Binding & Directives';

  // 2. Two-way Data Binding property [(ngModel)]
  customerName: string = 'Alex';
  specialNote: string = 'Extra caramel drizzle please!';
  membershipTier: 'Regular' | 'Premium' | 'VIP' = 'Premium';

  // 3. Property & Event Binding controls
  showMenu: boolean = true;
  selectedCategory: string = 'All';
  highlightSpecial: boolean = true;
  accentColor: string = '#0077b6';
  fontSize: number = 14;

  // Selected order items for live calculation
  selectedItemIds: number[] = [1, 3];

  // 4. Data list for *ngFor structural directive
  menuItems: IMenuItem[] = [
    { id: 1, name: 'Cappuccino', category: 'Hot Coffee', price: 120, inStock: true, description: 'Creamy espresso with velvety milk froth' },
    { id: 2, name: 'Latte', category: 'Hot Coffee', price: 140, inStock: true, description: 'Steamed milk poured over smooth espresso' },
    { id: 3, name: 'Cold Coffee', category: 'Cold Coffee', price: 150, inStock: true, description: 'Chilled rich artisan iced brew with vanilla cream' },
    { id: 4, name: 'Wood-Fired Pizza', category: 'Snacks', price: 250, inStock: true, description: 'Crispy thin crust with fresh mozzarella and basil' },
    { id: 5, name: 'Artisan Croissant', category: 'Bakery', price: 100, inStock: true, description: 'Golden flaky French pastry baked daily' },
    { id: 6, name: 'Dark Chocolate Cake', category: 'Desserts', price: 180, inStock: false, description: 'Decadent Belgian cocoa sponge (Currently sold out)' },
    { id: 7, name: 'Masala Chai', category: 'Hot Coffee', price: 80, inStock: true, description: 'Freshly brewed Assam tea with crushed spices' }
  ];

  categories: string[] = ['All', 'Hot Coffee', 'Cold Coffee', 'Snacks', 'Bakery', 'Desserts'];

  // Event handler for event binding (click)
  toggleItemSelection(id: number): void {
    const idx = this.selectedItemIds.indexOf(id);
    if (idx >= 0) {
      this.selectedItemIds.splice(idx, 1);
    } else {
      this.selectedItemIds.push(id);
    }
  }

  isItemSelected(id: number): boolean {
    return this.selectedItemIds.includes(id);
  }

  // Filtered list using Angular getter
  get filteredItems(): IMenuItem[] {
    if (this.selectedCategory === 'All') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  // Calculated total amount (Interpolation)
  get totalAmount(): number {
    return this.menuItems
      .filter(item => this.selectedItemIds.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  }

  // Event handler for Welcome Greeting
  greetCustomer(): void {
    const name = this.customerName.trim() || 'Valued Guest';
    alert(`👋 Welcome to ${this.cafeName}, ${name}!\nYour current order total: ₹${this.totalAmount}`);
  }

  // Toggle menu visibility (*ngIf demonstration)
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
