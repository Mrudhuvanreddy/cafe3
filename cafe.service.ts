import { Injectable } from '@angular/core';

export interface IMenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface ICafeOrder {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  itemName: string;
  quantity: number;
  tableNumber: number;
  specialNotes?: string;
  orderTotal: number;
  timestamp: string;
}

export interface ICustomerMember {
  name: string;
  email: string;
  phone: string;
  membershipType: 'Silver' | 'Gold' | 'Platinum';
  joinedDate: string;
}

/**
 * Week 13-14: Angular Service with Dependency Injection
 * Provided in root to act as a singleton service across all components in the SPA.
 */
@Injectable({
  providedIn: 'root'
})
export class CafeService {
  private cafeInfo = {
    name: 'THE WAVE ☕ Cafe',
    address: '123 Coffee Street, Downtown, Hyderabad',
    phone: '+91 98765 43210',
    email: 'info@thewavecafe.com',
    openHours: '8:00 AM - 10:00 PM Daily'
  };

  private menuItems: IMenuItem[] = [
    { id: 1, name: 'Cappuccino', category: 'Hot Coffee', price: 120, description: 'Velvety espresso with frothed steamed milk' },
    { id: 2, name: 'Latte', category: 'Hot Coffee', price: 140, description: 'Rich espresso balanced with silky steamed milk' },
    { id: 3, name: 'Cold Brew Coffee', category: 'Cold Coffee', price: 150, description: 'Slow-steeped artisan iced blend' },
    { id: 4, name: 'Wood-Fired Veg Pizza', category: 'Snacks', price: 250, description: 'Stone-baked thin crust with fresh veggies' },
    { id: 5, name: 'Artisan Croissant', category: 'Bakery', price: 100, description: 'Flaky buttery golden French croissant' },
    { id: 6, name: 'Belgian Chocolate Cake', category: 'Desserts', price: 180, description: 'Warm dark chocolate layered slice' },
    { id: 7, name: 'Masala Chai', category: 'Hot Coffee', price: 80, description: 'Traditional spiced aromatic brewed tea' }
  ];

  private orders: ICafeOrder[] = [
    {
      id: 101,
      customerName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '9876543210',
      itemName: 'Cappuccino',
      quantity: 2,
      tableNumber: 4,
      specialNotes: 'Extra hot with cinnamon',
      orderTotal: 240,
      timestamp: 'Today, 10:15 AM'
    },
    {
      id: 102,
      customerName: 'Priya Patel',
      email: 'priya@example.com',
      phone: '9812345678',
      itemName: 'Cold Brew Coffee',
      quantity: 1,
      tableNumber: 7,
      specialNotes: 'Almond milk',
      orderTotal: 150,
      timestamp: 'Today, 11:30 AM'
    }
  ];

  private members: ICustomerMember[] = [
    { name: 'Aarav Sharma', email: 'aarav@example.com', phone: '9876543210', membershipType: 'Gold', joinedDate: '2026-01-15' },
    { name: 'Priya Patel', email: 'priya@example.com', phone: '9812345678', membershipType: 'Platinum', joinedDate: '2026-02-20' }
  ];

  // Service methods to get cafe information
  getCafeInfo() {
    return this.cafeInfo;
  }

  // Get full menu items
  getMenu(): IMenuItem[] {
    return [...this.menuItems];
  }

  // Get specialty items
  getSpecialties(): IMenuItem[] {
    return this.menuItems.slice(0, 4);
  }

  // Get all active orders
  getOrders(): ICafeOrder[] {
    return [...this.orders];
  }

  // Add new order from Angular Form
  addOrder(orderData: Omit<ICafeOrder, 'id' | 'timestamp'>): ICafeOrder {
    const newOrder: ICafeOrder = {
      ...orderData,
      id: 100 + this.orders.length + 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  // Get all registered members
  getMembers(): ICustomerMember[] {
    return [...this.members];
  }

  // Register new member via Form
  registerMember(member: ICustomerMember): void {
    this.members.unshift(member);
  }
}
