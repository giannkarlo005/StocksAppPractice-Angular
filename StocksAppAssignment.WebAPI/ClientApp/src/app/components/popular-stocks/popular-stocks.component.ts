import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyProfile } from '../../models/company-profile';
import { AppService } from '../../services/app-service';
import { Stock } from '../../models/stock';
import { StocksService } from '../../services/stocks.service';

@Component({
  selector: 'app-popular-stocks',
  templateUrl: './popular-stocks.component.html',
  styleUrls: ['./popular-stocks.component.css']
})
export class PopularStocksComponent implements OnInit {
  popularStocks: Stock[] = [];
  selectedStock: CompanyProfile | null = null;

  constructor(private _appService: AppService,
              private _stocksService: StocksService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.fetchPopularStockData();
  }

  private fetchPopularStockData(): void {
    this._stocksService.fetchPopularStockData().subscribe({
      next: (response: Stock[]) => {
        this.popularStocks = response;
      },
      error: (error: any) => {
        //Unauthorized
        if (error && error.status) {
          if (error.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      },
      complete: () => {
      }
    });
  }

  getIsUserLoggedIn() {
    return this._appService.getIsUserLoggedIn();
  }

  onStockSelected(stockSymbol: any): void {
    this._stocksService.fetchSelectedStockData(stockSymbol).subscribe({
      next: (response: CompanyProfile) => {
        this.selectedStock = response;
        this._appService.setStockSymbol(stockSymbol);
      },
      error: (error: any) => {
        //Unauthorized
        if (error && error.status) {
          if (error.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      },
      complete: () => {
      }
    });
  }
}

