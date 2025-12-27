import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';
import { CheckoutData } from '../components/checkout-modal/checkout-modal.component';

@Injectable({
    providedIn: 'root'
})
export class WhatsappService {

    private phoneNumber = '5551992746985';

    constructor() { }

    generateMessage(items: CartItem[], total: number, data?: CheckoutData): string {
        let message = 'Olá! Gostaria de fazer um pedido:\n\n';

        items.forEach(item => {
            message += `(${item.quantity}x) ${item.product.name} — R$ ${(item.product.price * item.quantity).toFixed(2)}\n`;
        });


        if (data) {
            if (data.observations) {
                message += `\n*Observações:*\n`;
                message += ` ${data.observations}\n`;
            }

            message += `\n*Dados de Entrega:*\n`;
            message += ` ${data.address.street}, ${data.address.number}\n`;
            if (data.address.complement) message += ` Complemento: ${data.address.complement}\n`;
            message += ` ${data.address.neighborhood} - ${data.address.city}\n`;

            message += `\n*Forma de Pagamento:*\n`;
            message += ` ${data.paymentMethod}\n`;

        }

        // message += `\n*Total: R$ ${total.toFixed(2)}*`;

        return encodeURIComponent(message);
    }

    getLink(items: CartItem[], total: number, data?: CheckoutData): string {
        const message = this.generateMessage(items, total, data);
        return `https://wa.me/${this.phoneNumber}?text=${message}`;
    }

    getDirectLink(message: string = 'Olá! Gostaria de fazer um pedido.'): string {
        return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
    }
}
