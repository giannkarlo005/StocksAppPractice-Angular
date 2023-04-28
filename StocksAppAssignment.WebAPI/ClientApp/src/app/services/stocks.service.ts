import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyProfile } from '../models/company-profile';
import { UsExchange } from '../models/us-exchange';
import { Stock } from '../models/stock';

const API_BASE_URL = 'https://localhost:7200/api/';
@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private _httpClient: HttpClient) { }

  public fetchAllStockData(): Observable<UsExchange[]> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<UsExchange[]>(`${API_BASE_URL}v1/Trade/get-all-stocks`, {
      headers: headers
    });
  }

  public fetchPopularStockData(): Observable<Stock[]> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<Stock[]>(`${API_BASE_URL}v1/Stocks/explore`, {
      headers: headers
    });
  }

  public fetchSelectedStockData(stockSymbol: string): Observable<CompanyProfile> {
    let headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage['token']}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.post<CompanyProfile>(`${API_BASE_URL}v1/Stocks/explore`,
       `\"${stockSymbol}\"`,
      {
        headers: headers
      }
    );
  }
}
