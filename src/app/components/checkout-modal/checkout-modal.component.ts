import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem, CartService } from '../../services/cart.service';

export interface CheckoutData {
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    complement?: string;
  };
  paymentMethod: 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito' | 'PIX';
  observations: string;
}

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss'
})
export class CheckoutModalComponent {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Output() confirm = new EventEmitter<CheckoutData>();
  @Output() cancel = new EventEmitter<void>();

  step: number = 1;

  data: CheckoutData = {
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: ''
    },
    paymentMethod: 'Dinheiro',
    observations: ''
  };

  constructor(private cartService: CartService) { }

  nextStep() {
    this.step = 2;
  }

  prevStep() {
    this.step = 1;
  }

  increaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  onConfirm() {
    if (this.isValid()) {
      this.confirm.emit(this.data);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  isValid(): boolean {
    const { street, number, neighborhood, city } = this.data.address;
    return !!(street && number && neighborhood && city && this.data.paymentMethod);
  }
}
