import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl = 'api/items';
  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

       /** Log a HeroService message with the MessageService */
       private log(message: string) {
        this.messageService.add(`ItemService: ${message}`);
      }
          /**
       * Handle Http operation that failed.
       * Let the app continue.
       * @param operation - name of the operation that failed
       * @param result - optional value to return as the observable result
       */
      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`added Item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }
}
