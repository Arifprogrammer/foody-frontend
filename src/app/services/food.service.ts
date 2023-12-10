import { Injectable, inject } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import {
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
  FOOD_BY_ID_URL,
} from '../shared/constants/urls';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private http: HttpClient = inject(HttpClient);

  getAllFood(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearch(search: string): Observable<Food[] | []> {
    return this.http.get<Food[] | []>(FOODS_BY_SEARCH_URL + search);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getFoodsByTag(tag: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(id: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + id);
  }

  handleFavorite(id: string, value: boolean): Observable<Food> {
    return this.http.patch<Food>(FOOD_BY_ID_URL + id + '/favorite', {
      favorite: value,
    });
  }
}
