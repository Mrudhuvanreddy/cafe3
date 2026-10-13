/**
 * ============================================================================
 * WEEK 11: COMPILED JAVASCRIPT / TYPESCRIPT RUNNER - THE WAVE 🌊 CAFE
 * ============================================================================
 */

// 1. CLASSES
class MenuItem {
    constructor(id, name, category, price, description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }

    getFormattedPrice() {
        return "₹" + this.price.toFixed(2);
    }
}

class Customer {
    constructor(name, email, membership = "Regular", points = 0) {
        this.name = name;
        this.email = email;
        this.membership = membership;
        this.points = points;
    }

    getDiscountRate() {
        switch (this.membership) {
            case "VIP":
                return 0.20;
            case "Premium":
                return 0.10;
            default:
                return 0.00;
        }
    }

    addRewardPoints(orderTotal) {
        const earned = Math.floor(orderTotal / 10);
        this.points += earned;
    }
}

class CafeOrder {
    constructor(customer, orderPrefix = "WAVE") {
        this.customer = customer;
        this.orderId = `${orderPrefix}-${Date.now().toString().slice(-5)}`;
        this.cartItems = [];
    }

    addItem(item, quantity = 1) {
        const existing = this.cartItems.find(c => c.item.id === item.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cartItems.push({ item, quantity });
        }
    }

    removeItem(itemId) {
        this.cartItems = this.cartItems.filter(c => c.item.id !== itemId);
    }

    calculateSummary() {
        const subtotal = calculateSubtotal(this.cartItems);
        const discountRate = this.customer.getDiscountRate();
        const discountAmount = applyDiscount(subtotal, discountRate);
        const taxableAmount = subtotal - discountAmount;
        const taxAmount = calculateTax(taxableAmount, 0.05);
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

    generateInvoice() {
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

// 2. FUNCTIONS
function calculateSubtotal(items) {
    return items.reduce((total, { item, quantity }) => total + (item.price * quantity), 0);
}

function applyDiscount(subtotal, discountRate) {
    return subtotal * discountRate;
}

function calculateTax(amount, taxRate = 0.05) {
    return amount * taxRate;
}

function runDemo() {
    console.log("🌊 Running Week 11 TypeScript Demonstration for THE WAVE Cafe...\n");

    const cappuccino = new MenuItem(1, "☕ Cappuccino", "Coffee", 120, "Hot and creamy coffee");
    const croissant = new MenuItem(4, "🥐 Croissant", "Bakery", 100, "Fresh buttery croissant");
    const pizza = new MenuItem(5, "🍕 Pizza", "Snacks", 250, "Cheesy vegetable pizza");

    const member = new Customer("Alex Johnson", "alex@wavecafe.com", "VIP", 50);

    const order = new CafeOrder(member);
    order.addItem(cappuccino, 2);
    order.addItem(croissant, 1);
    order.addItem(pizza, 1);

    const invoice = order.generateInvoice();
    console.log(invoice);
    return invoice;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { MenuItem, Customer, CafeOrder, calculateSubtotal, applyDiscount, calculateTax, runDemo };
}

if (typeof require !== "undefined" && typeof window === "undefined" && require.main === module) {
    runDemo();
}
