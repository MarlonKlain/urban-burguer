import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItems.asObservable();

    constructor() {
        this.loadCart();
    }

    addToCart(product: Product) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.cartItems.next([...currentItems]);
        } else {
            this.cartItems.next([...currentItems, { product, quantity: 1 }]);
        }
        this.saveCart();
    }

    private saveCart() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
        }
    }

    private loadCart() {
        if (typeof localStorage !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                try {
                    this.cartItems.next(JSON.parse(savedCart));
                } catch (e) {
                    console.error('Error loading cart from localStorage', e);
                }
            }
        }
    }

    removeFromCart(productId: number) {
        const currentItems = this.cartItems.value;
        const updatedItems = currentItems.filter(item => item.product.id !== productId);
        this.cartItems.next(updatedItems);
        this.saveCart();
    }

    updateQuantity(productId: number, quantity: number) {
        const currentItems = this.cartItems.value;
        const item = currentItems.find(i => i.product.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.cartItems.next([...currentItems]);
                this.saveCart();
            }
        }
    }

    getTotal(): number {
        return this.cartItems.value.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }

    getItems(): CartItem[] {
        return this.cartItems.value;
    }

    clearCart() {
        this.cartItems.next([]);
        this.saveCart();
    }
}
