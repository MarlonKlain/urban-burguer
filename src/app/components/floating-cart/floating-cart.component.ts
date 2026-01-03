import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        const link = this.whatsappService.getLink(items, total, data);

        window.open(link, '_blank');
        this.closeCheckout();
        this.cartService.clearCart();
    }
}
