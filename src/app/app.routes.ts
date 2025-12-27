import { Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';
import { TermsComponent } from './views/support/terms/terms.component';
import { PrivacyComponent } from './views/support/privacy/privacy.component';
import { AboutComponent } from './views/support/about/about.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'menu', component: MenuPageComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' }
];
