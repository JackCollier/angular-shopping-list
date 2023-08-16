import { Injectable } from '@angular/core';
import { ListItem } from './list-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrlToBuyList = 'http://localhost:3000/to-buy-list';
  private apiUrlPreviouslyBoughtList =
    'http://localhost:3000/previously-bought-list';

  constructor(private http: HttpClient) {}

  getAllToBuyItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrlToBuyList);
  }

  getAllPreviouslyBoughtItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrlPreviouslyBoughtList);
  }

  postToBuyItem(item: ListItem): Observable<ListItem[]> {
    return this.http.post<ListItem[]>(this.apiUrlToBuyList, item);
  }
}
