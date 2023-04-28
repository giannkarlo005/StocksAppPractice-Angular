import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StockTrade } from '../models/stock-trade';

const API_BASE_URL = 'http://localhost:7200/api/';
@Injectable({
  providedIn: 'root'
})
export class TradeService {
  constructor(private _httpClient: HttpClient) { }

  public getCompanyStockPrice(stockSymbol: string): Observable<StockTrade> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<StockTrade>(`${API_BASE_URL}v1/Trade/get-company-stockPrice/${stockSymbol}`, {
      headers: headers
    });
  }

  public buyOrder(orderRequest: any): Observable<any> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.post<any>(`${API_BASE_URL}v1/Trade/buy-order`,
      orderRequest,
      {
        headers: headers
      });
  }

  public sellOrder(orderRequest: any): Observable<any> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.post<any>(`${API_BASE_URL}v1/Trade/sell-order`,
      orderRequest,
      {
        headers: headers
      });
  }
}
