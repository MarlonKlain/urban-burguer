import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService, CartItem } from '../../services/cart.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { CheckoutModalComponent, CheckoutData } from '../checkout-modal/checkout-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-floating-cart',
    standalone: true,
    imports: [CommonModule, CheckoutModalComponent],
    templateUrl: './floating-cart.component.html',
    styleUrl: './floating-cart.component.scss'
})
export class FloatingCartComponent {
    public cartService = inject(CartService);
    private whatsappService = inject(WhatsappService);
    private http = inject(HttpClient);

    cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
    cartTotal$: Observable<number> = this.cartItems$.pipe(
        map(items => items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
    );

    showCheckout: boolean = false;

    openCheckout() {
        this.showCheckout = true;
    }

    closeCheckout() {
        this.showCheckout = false;
    }

    onCheckoutConfirm(data: CheckoutData) {
        const items = this.cartService.getItems();
        const total = this.cartService.getTotal();

        // Send to backend
        const orderPayload = {
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            items: JSON.stringify(items.map(i => ({ name: i.product.name, quantity: i.quantity }))),
            total: total
        };

        this.http.post('http://localhost:8080/api/public/orders', orderPayload).subscribe({
            next: () => console.log('Order sent to backend'),
            error: (err) => console.error('Failed to send order', err)
        });

        const link = this.whatsappService.getLink(items, total, data);

        window.open(link, '_blank');
        this.closeCheckout();
        this.cartService.clearCart();
    }
}
