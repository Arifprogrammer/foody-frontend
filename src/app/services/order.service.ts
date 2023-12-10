import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../shared/models/Order';
import { ORDERS_CREATE_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http: HttpClient = inject(HttpClient);

  createOrder(orderInfo: Order): Observable<Order> {
    return this.http.post<Order>(ORDERS_CREATE_URL, orderInfo);
  }
}
