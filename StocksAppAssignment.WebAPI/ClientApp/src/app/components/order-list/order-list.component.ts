import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AppService } from '../../services/app-service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  stockSymbol: any;
  paramSubscription: any;
  buyOrders: any[] = [];
  sellOrders: any[] = [];

  constructor(private _appService: AppService,
              private _orderService: OrderService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    this.paramSubscription = this._activatedRoute.paramMap.subscribe((params) => {
      this.stockSymbol = params.get('stockSymbol')?.toString();

      if (this.stockSymbol) {
        this.getOrders(this.stockSymbol);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  getIsUserLoggedIn() {
    return this._appService.getIsUserLoggedIn();
  }

  computeTradeAmount(orderQuantity: number, orderPrice: number): number {
    return Math.round(orderPrice * orderQuantity);
  }

  formatDateTime(dateTime: Date): string{
    if (dateTime == null) {
      return "";
    }
    return "";// dateTime.toString("dd MMMM yyyy HH:mm:ss tt");
  }

  getOrders(stockSymbol: string): void {
    this._orderService.getOrders(stockSymbol).subscribe({
      next: (response: any) => {
        if (!response) {
          return;
        }
        this.buyOrders = response.buyOrders || [];
        this.sellOrders = response.sellOrders || [];
      },
      error: (error: any) => {
        if (error && error.status) {
          //Unauthorized
          if (error.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      },
      complete: () => {
      }
    });
  }

  onViewPdfLinkClicked(): void {
    this._orderService.viewPDF(this.stockSymbol).subscribe({
      next: (response: any) => {
        console.log(response);
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);

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
