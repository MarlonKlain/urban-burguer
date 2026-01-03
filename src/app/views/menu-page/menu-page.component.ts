import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FloatingCartComponent } from '../../components/floating-cart/floating-cart.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, FormsModule, FloatingCartComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss'
})
export class MenuPageComponent {
  private productsService = inject(ProductsService);

  // State Signals
  searchTerm = signal('');
  activeCategory = signal('');

  // Data Signal (Auto-subscribed)
  products = toSignal(this.productsService.getProducts(1), { initialValue: [] });

  // Computed: Unique Categories from Products
  categories = computed(() => {
    const prods = this.products();
    const unique = [...new Set(prods.map(p => p.category))];
    return ['All', ...unique.sort()];
  });

  // Computed: Filtered Products based on search and active category
  filteredProducts = computed(() => {
    const prods = this.products();
    const active = this.activeCategory();
    const search = this.searchTerm().toLowerCase();

    return prods.filter(p => {
      const matchesCategory = active === 'All' || p.category === active;
      if (!search) return matchesCategory;

      const matchesSearch = p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  });

  constructor() {
    // Effect: Automatically Select First Category when Categories Load
    effect(() => {
      const cats = this.categories();
      const currentActive = this.activeCategory();

      // If we have categories but no valid active category selected, select the first one ('All')
      if (cats.length > 0 && !cats.includes(currentActive)) {
        this.activeCategory.set(cats[0]);
      }
    }, { allowSignalWrites: true });
  }

  // Actions
  selectCategory(category: string) {
    this.activeCategory.set(category);
  }

  // Search Update (called from template)
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }
}
