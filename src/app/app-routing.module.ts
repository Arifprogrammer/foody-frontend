import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SingleFoodComponent } from './components/pages/single-food/single-food.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CheckoutComponent } from './components/partials/checkout/checkout.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Foody | Home' },
  { path: 'food/:id', component: SingleFoodComponent, title: 'Foody | Food' },
  { path: 'search/:name', component: HomeComponent, title: 'Foody | Home' },
  { path: 'tags/:tag', component: HomeComponent, title: 'Foody | Home' },
  {
    path: 'cart-page',
    component: CartPageComponent,
    title: 'Foody | Cart',
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent, title: 'Foody | Login' },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Foody | Checkout',
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent, title: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
