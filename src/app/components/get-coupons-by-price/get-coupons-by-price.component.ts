import { MessageService } from 'primeng/api';
import { WebApiCompanyService } from './../../services/web-api-company.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';
// import * as $ from 'jquery';


@Component({
  selector: 'app-get-coupons-by-price',
  templateUrl: './get-coupons-by-price.component.html',
  styleUrls: ['./get-coupons-by-price.component.css']
})
export class GetCouponsByPriceComponent implements OnInit {

  price: number;
  coupons: Coupon[] = [];
  couponsForPrices: Coupon[] = [];
  cols: any[];
  numOfCoupons: number;
  caption = 'Coupons By Price';
  minPrice: number;
  maxPrice: number;
  hasData = false;

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private companyService: WebApiCompanyService, private messageService: MessageService ) {
    // this.hasData = companyService.hasData;
    this.cols = companyService.couponCols;
  }

  ngOnInit() {
    // this.cols = [
    //   { displayName: 'Id',          field: 'id',          type: 'number' ,  disabled: 'true' ,  tag: 'input'},
    //   { displayName: 'Title',       field: 'title',       type: 'text' ,    disabled: 'true' ,  tag: 'input'},
    //   { displayName: 'Start Date',  field: 'startDate',   type: 'date' ,    disabled: 'true' ,  tag: 'cal'},
    //   { displayName: 'End Date',    field: 'endDate',     type: 'date' ,    disabled: 'false',  tag: 'cal'},
    //   { displayName: 'Amount',      field: 'amount',      type: 'number' ,  disabled: 'true' ,  tag: 'input'},
    //   { displayName: 'Type',        field: 'type',        type: 'text' ,    disabled: 'true' ,  tag: 'list'},
    //   { displayName: 'Message',     field: 'message' ,    type: 'text' ,    disabled: 'true' ,  tag: 'input'},
    //   { displayName: 'Price',       field: 'price' ,      type: 'number',   disabled: 'false',  tag: 'input'},
    //   { displayName: 'Image',       field: 'image' ,      type: 'text',     disabled: 'true' ,  tag: 'input'}
    // ];

    // This methos populate the min price and the max price for the favor of the slider boundaries
    this.getMinMaxPrices();

}

  // This method is activated (by event) every time the user changes the price.
  // It activate the getCouponByPriceService service that presnet the relevant data to the user
  onPriceChange(event) {
    this.companyService.getCouponByPriceService(event.value).subscribe (
      (resp) => {
        this.coupons = resp.json();
        this.numOfCoupons = this.coupons.length;
        this.coupons.sort((a: any, b: any) => {
          if (a.title < b.title) {
            return -1;
          } else if (a.title > b.title) {
            return 1;
          } else {
            return 0;
          }
        });
      },
      (error) => {
        console.log(error._body);
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      }
    );
  }

  // This method is activated from the ngOnInit and it responsible
  // to populate the min price and the max price for the favor of the slider boundaries
  private getMinMaxPrices() {
      this.companyService.getAllCouponsService().subscribe (
        (resp) => {
          this.couponsForPrices = resp.json();
          this.couponsForPrices.sort((a: any, b: any) => {
            if (a.price < b.price) {
              return -1;
            } else if (a.price > b.price) {
              return 1;
            } else {
              return 0;
            }
          });
      this.minPrice = this.couponsForPrices[0].price;
      this.maxPrice = this.couponsForPrices[this.couponsForPrices.length - 1].price;
      this.price = this.maxPrice;
      this.initializeView(this.price);
     });
  }

// This method initialize the screen with all the coupons from the higher price to te lower price
private initializeView(price: number) {
  this.companyService.getCouponByPriceService(price).subscribe (
    (resp) => {
      this.hasData = true;
      this.coupons = resp.json();
      this.numOfCoupons = this.coupons.length;
      this.coupons.sort((a: any, b: any) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    (error) => {
      console.log(error._body);
      this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
    });
  }

}
