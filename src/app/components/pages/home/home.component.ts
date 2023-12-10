import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchBoxComponent } from '../../partials/search-box/search-box.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { ErrorTextComponent } from '../../partials/error-text/error-text.component';
import { Observable, tap } from 'rxjs';
import { LoaderComponent } from '../../partials/loader/loader.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBoxComponent,
    TagsComponent,
    ErrorTextComponent,
    LoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private foodService: FoodService = inject(FoodService);
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  foods: Food[] = [];
  searchedFood!: string | null;
  tag!: string | null;
  seeAll: boolean = false;
  loading: boolean = false;
  user!: User;

  ngOnInit() {
    let foodsObservable!: Observable<Food[]>;

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.searchedFood = params.get('name');
        this.tag = params.get('tag');

        if (this.searchedFood) {
          foodsObservable = this.foodService.getAllFoodBySearch(
            this.searchedFood!
          );
          this.seeAll = true;
        } else if (this.tag) {
          foodsObservable = this.foodService.getFoodsByTag(this.tag!);
          this.seeAll = true;
        } else {
          foodsObservable = this.foodService.getAllFood();
        }
        this.loading = true;
        foodsObservable
          .pipe(
            tap((value) => {
              // this.loading = true;
              // console.log(this.loading);
            })
          )
          .subscribe({
            next: (data) => (this.foods = data),
            error: (err) => {
              console.log(err);
              this.loading = false;
            },
            complete: () => {
              this.loading = false;
              // console.log(this.loading);
            },
          });
      },
      error: (err) => console.log(err),
    });
    this.user = this.userService.getUser();
  }

  optimisticUpdateofFavoriteIcon(id: string, value: boolean) {
    const findUpdateFood = this.foods.find((food) => food.id === id);
    findUpdateFood!.favorite = value;
    const findIndex = this.foods.findIndex((food) => food.id === id);
    this.foods.splice(findIndex, 1, findUpdateFood!);
  }

  handleFavorite(id: string, value: boolean) {
    this.optimisticUpdateofFavoriteIcon(id, !value);
    this.foodService.handleFavorite(id, !value).subscribe({
      next: (updatedData) => {
        const findIndex = this.foods.findIndex(
          (food) => food.id === updatedData.id
        );
        this.foods.splice(findIndex, 1, updatedData);
      },
      error: (err) => {
        console.log(err);
        this.optimisticUpdateofFavoriteIcon(id, !value);
      },
    });
  }
}
