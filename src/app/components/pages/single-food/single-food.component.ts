import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';
import { ErrorTextComponent } from '../../partials/error-text/error-text.component';
import { LoaderComponent } from '../../partials/loader/loader.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-single-food',
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorTextComponent, LoaderComponent],
  templateUrl: './single-food.component.html',
  styleUrls: ['./single-food.component.css'],
})
export class SingleFoodComponent implements OnInit {
  private foodServie: FoodService = inject(FoodService);
  private cartService: CartService = inject(CartService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  food: Food | undefined = undefined;
  addedItem!: boolean;
  loading: boolean = false;
  user!: User;

  ngOnInit() {
    this.user = this.userService.getUser();
    this.activatedRoute.params
      .pipe(
        tap(() => (this.loading = true)),
        map((params) => params['id']),
        tap((id) => console.log(id)),
        switchMap((id) => this.foodServie.getFoodById(id)),
        switchMap((data) => {
          this.food = data;
          return this.cartService.getCartObsevable();
        })
      )
      .subscribe({
        next: (cart) => {
          console.log(this.food?.id); //! weird behavior
          this.addedItem = cart.items.find(
            (item) => item.food.id === this.food?.id
          )
            ? true
            : false;
          this.loading = false;
        },
        error: (err) => {
          console.log(err + +'from foodService');
          this.loading = false;
        },
      });

    /* this.cartService.getCartObsevable().subscribe((cart) => {
      console.log(this.food?.id);
      this.addedItem = cart.items.find((item) => item.food.id === this.food?.id)
        ? true
        : false;
    }); */
  }

  addFoodToCart(food: Food) {
    this.cartService.addToCart(food);
    this.router.navigateByUrl('/cart-page');
  }
}
