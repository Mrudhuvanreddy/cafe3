/**
 * ============================================================================
 * WEEK 11: TYPESCRIPT PROGRAM - THE WAVE 🌊 CAFE
 * Topic: Developing TypeScript programs using classes, interfaces, and functions
 * ============================================================================
 */

// 1. INTERFACES
export interface IMenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
}

export interface ICartItem {
    item: IMenuItem;
    quantity: number;
}

export type MembershipTier = "Regular" | "Premium" | "VIP";

export interface ICustomer {
    name: string;
    email: string;
    membership: MembershipTier;
    points: number;
}

export interface IOrderSummary {
    orderId: string;
    customerName: string;
    itemsCount: number;
    subtotal: number;
    discountPercent: number;
    discountAmount: number;
    taxAmount: number;
    finalTotal: number;
    timestamp: Date;
}

// 2. CLASSES

/**
 * Represents a menu item in THE WAVE Cafe
 */
export class MenuItem implements IMenuItem {
    constructor(
        public id: number,
        public name: string,
        public category: string,
        public price: number,
        public description: string
    ) {}

    getFormattedPrice(): string {
        return `₹${this.price.toFixed(2)}`;
    }
}

/**
 * Represents a cafe customer with membership rewards
 */
export class Customer implements ICustomer {
    constructor(
        public name: string,
        public email: string,
        public membership: MembershipTier = "Regular",
        public points: number = 0
    ) {}

    getDiscountRate(): number {
        switch (this.membership) {
            case "VIP":
                return 0.20; // 20% discount
            case "Premium":
                return 0.10; // 10% discount
            default:
                return 0.00; // No discount for regular
        }
    }

    addRewardPoints(orderTotal: number): void {
        const earned = Math.floor(orderTotal / 10);
        this.points += earned;
    }
}

/**
 * Represents an Order at THE WAVE Cafe
 */
export class CafeOrder {
    public orderId: string;
    private cartItems: ICartItem[] = [];

    constructor(
        public customer: Customer,
        orderPrefix: string = "WAVE"
    ) {
        this.orderId = `${orderPrefix}-${Date.now().toString().slice(-5)}`;
    }

    addItem(item: IMenuItem, quantity: number = 1): void {
        const existing = this.cartItems.find(c => c.item.id === item.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cartItems.push({ item, quantity });
        }
    }

    removeItem(itemId: number): void {
        this.cartItems = this.cartItems.filter(c => c.item.id !== itemId);
    }

    getItems(): ICartItem[] {
        return [...this.cartItems];
    }

    calculateSummary(): IOrderSummary {
        const subtotal = calculateSubtotal(this.cartItems);
        const discountRate = this.customer.getDiscountRate();
        const discountAmount = applyDiscount(subtotal, discountRate);
        const taxableAmount = subtotal - discountAmount;
        const taxAmount = calculateTax(taxableAmount, 0.05); // 5% GST
        const finalTotal = taxableAmount + taxAmount;

        this.customer.addRewardPoints(finalTotal);

        return {
            orderId: this.orderId,
            customerName: this.customer.name,
            itemsCount: this.cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
            subtotal,
            discountPercent: discountRate * 100,
            discountAmount,
            taxAmount,
            finalTotal,
            timestamp: new Date()
        };
    }

    generateInvoice(): string {
        const summary = this.calculateSummary();
        let receipt = `\n========================================\n`;
        receipt += `      THE WAVE 🌊 CAFE - TAX INVOICE    \n`;
        receipt += `========================================\n`;
        receipt += `Order ID : ${summary.orderId}\n`;
        receipt += `Customer : ${summary.customerName} (${this.customer.membership})\n`;
        receipt += `Date     : ${summary.timestamp.toLocaleString()}\n`;
        receipt += `----------------------------------------\n`;
        receipt += `Item                  Qty   Price   Total\n`;
        receipt += `----------------------------------------\n`;

        this.cartItems.forEach(({ item, quantity }) => {
            const lineTotal = item.price * quantity;
            receipt += `${item.name.padEnd(20)} ${quantity.toString().padStart(3)}  ₹${item.price.toString().padStart(4)}  ₹${lineTotal.toString().padStart(5)}\n`;
        });

        receipt += `----------------------------------------\n`;
        receipt += `Subtotal           : ₹${summary.subtotal.toFixed(2)}\n`;
        if (summary.discountAmount > 0) {
            receipt += `Discount (${summary.discountPercent}%)   : -₹${summary.discountAmount.toFixed(2)}\n`;
        }
        receipt += `Tax (5% GST)       : +₹${summary.taxAmount.toFixed(2)}\n`;
        receipt += `========================================\n`;
        receipt += `GRAND TOTAL        : ₹${summary.finalTotal.toFixed(2)}\n`;
        receipt += `Reward Points Bal  : ${this.customer.points} pts\n`;
        receipt += `========================================\n`;
        receipt += `   Thank you for visiting THE WAVE! ☕  \n\n`;

        return receipt;
    }
}

// 3. PURE FUNCTIONS

/**
 * Calculates raw subtotal before tax and discount
 */
export function calculateSubtotal(items: ICartItem[]): number {
    return items.reduce((total, { item, quantity }) => total + (item.price * quantity), 0);
}

/**
 * Calculates discount amount based on percentage
 */
export function applyDiscount(subtotal: number, discountRate: number): number {
    return subtotal * discountRate;
}

/**
 * Calculates tax on taxable amount
 */
export function calculateTax(amount: number, taxRate: number = 0.05): number {
    return amount * taxRate;
}

// ============================================================================
// DEMONSTRATION EXECUTION
// ============================================================================
export function runDemo(): void {
    console.log("🌊 Running Week 11 TypeScript Demonstration for THE WAVE Cafe...\n");

    // Create menu items
    const cappuccino = new MenuItem(1, "☕ Cappuccino", "Coffee", 120, "Hot and creamy coffee");
    const croissant = new MenuItem(4, "🥐 Croissant", "Bakery", 100, "Fresh buttery croissant");
    const pizza = new MenuItem(5, "🍕 Pizza", "Snacks", 250, "Cheesy vegetable pizza");

    // Create a customer
    const member = new Customer("Alex Johnson", "alex@wavecafe.com", "VIP", 50);

    // Create order and add items
    const order = new CafeOrder(member);
    order.addItem(cappuccino, 2); // 2 x 120 = 240
    order.addItem(croissant, 1);  // 1 x 100 = 100
    order.addItem(pizza, 1);      // 1 x 250 = 250

    // Print generated invoice
    console.log(order.generateInvoice());
}

// Auto-run if executed directly via Node
if (typeof require !== "undefined" && require.main === module) {
    runDemo();
}
