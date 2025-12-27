import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { ReviewsSectionComponent } from '../../components/reviews-section/reviews-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroSectionComponent, FeaturedProductsComponent, ReviewsSectionComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent { }
