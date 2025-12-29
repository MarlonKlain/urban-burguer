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

    // Extract filename from URL
    let filename = originalUrl.split('/').pop();
    if (!filename) return originalUrl;

    // Remove query parameters (e.g., ?_a=...)
    filename = filename.split('?')[0];

    // Remove extension (e.g., .png)
    filename = filename.split('.')[0];

    if (!filename) return originalUrl;

    // Construct the full Cloudinary Public ID: just the filename
    const publicId = filename;

    // Create the Cloudinary Image instance using the Public ID
    const myImage = this.cld.image(publicId);

    // Resize to 400x400 for optimization
    myImage.resize(fill().width(400).height(400));

    const url = myImage.toURL();
    console.log(`[ProductsService] Generated Cloudinary URL for ${filename}:`, url);
    return url;
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
