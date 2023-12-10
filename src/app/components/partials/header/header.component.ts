import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'custom-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private cartService: CartService = inject(CartService);
  private userService: UserService = inject(UserService);

  countItem!: number;
  user!: User;

  ngOnInit(): void {
    this.cartService.getCartObsevable().subscribe((value) => {
      this.countItem = value.items.length;
    });

    this.userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

  get isAuth(): boolean {
    return this.user.token ? true : false;
  }

  logOut() {
    this.userService.logOut();
  }
}
