import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';
import { CartService } from 'src/app/services/cart.service';
import { RouterModule } from '@angular/router';
import { Cart } from 'src/app/shared/models/Cart';
import { ErrorTextComponent } from '../../partials/error-text/error-text.component';

@Component({
  selector: 'cart-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, ErrorTextComponent, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  private cartService: CartService = inject(CartService);

  cart!: Cart;

  ngOnInit() {
    this.cartService.getCartObsevable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  changeQuantity(id: string, quantity: string): void {
    this.cartService.changeQuantity(id, parseInt(quantity));
  }

  removerCart(id: string): void {
    this.cartService.removeFromCart(id);
  }
}
