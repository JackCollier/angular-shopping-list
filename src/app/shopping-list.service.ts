import { Injectable } from '@angular/core';
import { ListItem } from './list-item';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrlToBuyList = 'http://localhost:3000/to-buy-list';
  private apiUrlPreviouslyBoughtList =
    'http://localhost:3000/previously-bought-list';
  private newItemSubject = new Subject<void>();
  private deleteToBuyItemSubject = new Subject<void>();
  private deletePreviouslyBoughtItemSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllToBuyItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrlToBuyList);
  }

  getAllPreviouslyBoughtItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.apiUrlPreviouslyBoughtList);
  }

  postToBuyItem(item: ListItem): Observable<ListItem[]> {
    return this.http.post<ListItem[]>(this.apiUrlToBuyList, item).pipe(
      tap(() => {
        this.newItemSubject.next();
      })
    );
  }

  postPreviouslyBoughtItem(item: ListItem): Observable<void> {
    return this.http.post<void>(this.apiUrlPreviouslyBoughtList, item);
  }

  deleteToBuyItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlToBuyList}/${id}`).pipe(
      tap(() => {
        this.deleteToBuyItemSubject.next();
      })
    );
  }

  deletePreviouslyBoughtItem(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrlPreviouslyBoughtList}/${id}`)
      .pipe(
        tap(() => {
          this.deletePreviouslyBoughtItemSubject.next();
        })
      );
  }

  getNewItemObservable(): Observable<void> {
    return this.newItemSubject.asObservable();
  }

  getDeleteToBuyItemObservable(): Observable<void> {
    return this.deleteToBuyItemSubject.asObservable();
  }

  getDeletePreviouslyBoughtItemObservable(): Observable<void> {
    return this.deletePreviouslyBoughtItemSubject.asObservable();
  }
}
