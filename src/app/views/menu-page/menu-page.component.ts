import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService, CartItem } from '../../services/cart.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CheckoutModalComponent, CheckoutData } from '../../components/checkout-modal/checkout-modal.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, FormsModule, CheckoutModalComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss'
})
export class MenuPageComponent {
  private productsService = inject(ProductsService);
  public cartService = inject(CartService);
  private whatsappService = inject(WhatsappService);

  // State Signals
  searchTerm = signal('');
  activeCategory = signal('');

  // Data Signal (Auto-subscribed)
  products = toSignal(this.productsService.getProducts(), { initialValue: [] });

  // Computed: Unique Categories from Products
  categories = computed(() => {
    const prods = this.products();
    const unique = [...new Set(prods.map(p => p.category))];
    return unique.sort();
  });

  // Computed: Filtered Products based on search and active category
  filteredProducts = computed(() => {
    const prods = this.products();
    const active = this.activeCategory();
    const search = this.searchTerm().toLowerCase();

    return prods.filter(p => {
      const matchesCategory = p.category === active;
      if (!search) return matchesCategory;

      const matchesSearch = p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  });

  // Cart Observables (Keeping as observables for now to minimize changes to CartService)
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  cartTotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
  );

  whatsappLink: string = '';
  showCheckout: boolean = false;

  constructor() {
    // Effect: Automatically Select First Category when Categories Load
    effect(() => {
      const cats = this.categories();
      const currentActive = this.activeCategory();

      // If we have categories but no valid active category selected, select the first one
      if (cats.length > 0 && !cats.includes(currentActive)) {
        this.activeCategory.set(cats[0]);
      }
    }, { allowSignalWrites: true });

    // Effect: Update Whatsapp Link when cart changes (using observable subscription in constructor for simplicity or could be signal)
    this.cartItems$.subscribe(items => {
      const total = this.cartService.getTotal();
      this.whatsappLink = this.whatsappService.getLink(items, total);
    });
  }

  // Actions
  selectCategory(category: string) {
    this.activeCategory.set(category);
  }

  // Search Update (called from template)
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

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
