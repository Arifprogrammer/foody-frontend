import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { TitleComponent } from '../title/title.component';
import { RouterModule } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ErrorTextComponent } from '../error-text/error-text.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterModule, ErrorTextComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private userService: UserService = inject(UserService);
  private orderService: OrderService = inject(OrderService);

  order: Order = new Order();
  userName!: string;
  userEmail!: string;
  isAdmin!: boolean;
  disabled: boolean = false;

  ngOnInit() {
    this.order.items = this.cartService.getLatestCart().items;
    this.order.totalPrice = this.cartService.getLatestCart().totalPrice;
    let { name, email, isAdmin } = this.userService.getUser();
    this.userName = name;
    this.userEmail = email;
    this.isAdmin = isAdmin;
  }

  createOrder() {
    this.order.name = this.userName;
    this.order.email = this.userEmail;
    this.order.id = this.userService.getUser().id;
    this.orderService.createOrder(this.order).subscribe({
      next: (value) => {
        console.log(value);
        this.disabled = true;
        alert('Payment successful');
      },
      error: (err) => {
        console.log(err);
        if (err.error.message === 'forbidden access')
          alert("Please login as 'User'");
      },
    });
  }
}
