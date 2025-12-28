import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/public/menu`;
  private cld = new Cloudinary({
    cloud: {
      cloudName: environment.cloudinary.cloudName
    }
  });

  constructor() { }

  getProducts(userId: number): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`).pipe(
      map(items => items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.ingredients || '',
        price: item.price,
        image: this.getProductImage(item.imageUrl),
        category: item.category || 'Outros',
        featured: item.featured || false
      })))
    );
  }

  private getProductImage(originalUrl: string): string {
    if (!originalUrl) return 'assets/products/placeholder.svg';

    // Extract filename from URL (e.g., '.../burger1.png' -> 'burger1')
    const filename = originalUrl.split('/').pop()?.split('.')[0];
    if (!filename) return originalUrl;

    const myImage = this.cld.image(`${environment.cloudinary.folder}/${filename}`);
    // Optional: Add transformations
    myImage.resize(fill().width(400).height(400));

    return myImage.toURL();
  }

  getFeaturedProducts(userId: number): Observable<Product[]> {
    return this.getProducts(userId).pipe(
      map(products => products.filter(p => p.featured))
    );
  }

  getProductsByCategory(userId: number, category: string): Observable<Product[]> {
    return this.getProducts(userId).pipe(
      map(products => products.filter(p => p.category === category))
    );
  }
}
