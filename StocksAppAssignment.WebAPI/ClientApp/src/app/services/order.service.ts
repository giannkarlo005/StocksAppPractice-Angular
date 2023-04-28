import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_BASE_URL = 'https://localhost:7200/api/';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _httpClient: HttpClient) { }

  public getOrders(stockSymbol: string): Observable<any> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<any>(`${API_BASE_URL}v1/Trade/get-orders/${stockSymbol}`, {
      headers: headers
    });
  }

  public viewPDF(stockSymbol: string): Observable<any> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<any>(`${API_BASE_URL}v1/Trade/orders-pdf/${stockSymbol}`, {
      headers: headers
    });
  }
}
