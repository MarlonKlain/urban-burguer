import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.getFeaturedProducts(1);
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    const itemWidth = container.querySelector('.product-card')?.offsetWidth || 240;
    const gap = 16; // 1rem
    container.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    const itemWidth = container.querySelector('.product-card')?.offsetWidth || 240;
    const gap = 16;
    container.scrollBy({ left: (itemWidth + gap), behavior: 'smooth' });
  }
}
