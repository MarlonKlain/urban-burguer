import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/public/menu/12`; // Hardcoded restaurant ID 12

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.ingredients || '',
        price: item.price,
        image: item.imageUrl || 'assets/products/placeholder.svg',
        category: item.category || 'Outros',
        featured: item.featured || false
      })))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.featured))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.category === category))
    );
  }
}
