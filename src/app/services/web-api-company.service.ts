import { Coupon } from './../components/common/Coupon';
import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class WebApiCompanyService {


  // hasData: boolean;
  couponCols: any[];
  couponTypes: any[];
  prefixCompanyUrl = 'http://localhost:8080/company/';
  prefixLogOutUrl = 'http://localhost:8080/';

  constructor( private http: Http ) {
    // this.hasData = false;

    this.couponCols = [
      { displayName: 'Id',          field: 'id',          type: 'number' ,  disabled: 'true' ,  tag: 'input'},
      { displayName: 'Title',       field: 'title',       type: 'text' ,    disabled: 'true' ,  tag: 'input'},
      { displayName: 'Start Date',  field: 'startDate',   type: 'date' ,    disabled: 'true' ,  tag: 'cal'},
      { displayName: 'End Date',    field: 'endDate',     type: 'date' ,    disabled: 'false',  tag: 'cal'},
      { displayName: 'Amount',      field: 'amount',      type: 'number' ,  disabled: 'true' ,  tag: 'input'},
      { displayName: 'Type',        field: 'type',        type: 'text' ,    disabled: 'true' ,  tag: 'list'},
      { displayName: 'Message',     field: 'message' ,    type: 'text' ,    disabled: 'true' ,  tag: 'input'},
      { displayName: 'Price',       field: 'price' ,      type: 'number',   disabled: 'false',  tag: 'input'},
      { displayName: 'Image',       field: 'image' ,      type: 'text',     disabled: 'true' ,  tag: 'input'}
    ];

    this.couponTypes = [
      {label: 'Resturant' , value: 'RESTURANT'},
      {label: 'Electricity', value: 'ELECTRICITY'},
      {label: 'Food', value: 'FOOD'},
      {label: 'Health', value: 'HEALTH'},
      {label: 'Sports', value: 'SPORTS'},
      {label: 'Camping', value: 'CAMPING'},
      {label: 'Travelling', value: 'TRAVELLING'},
    ];
  }

  /**********************************************************************************/
  /*********************Services for all the company methods*************************/
  /**********************************************************************************/

  // Get all the coupons from the DB
  public getAllCouponsService() {
    // return this.http.get('http://localhost:8080/company/get-all-coupons');
    return this.http.get(this.prefixCompanyUrl + 'get-all-coupons');
  }

  // Add new company to the DB
  public addNewCouponService(coupon: Coupon) {
    // return this.http.post('http://localhost:8080/company/create-coupon/', coupon);
    return this.http.post(this.prefixCompanyUrl + 'create-coupon/', coupon);
  }

  // Delete a company to the DB
  public deleteCouponService(coupon: Coupon) {
    const options = new RequestOptions({
      body: coupon
    });
    // return this.http.delete ('http://localhost:8080/company/remove-coupon/' + coupon.id, options);
    return this.http.delete (this.prefixCompanyUrl + 'remove-coupon/' + coupon.id, options);
  }

  public updateCouponService(coupon: Coupon) {
    // return this.http.put ('http://localhost:8080/company/update-coupon/' + coupon.id, coupon);
    return this.http.put (this.prefixCompanyUrl + 'update-coupon/' + coupon.id, coupon);
  }

  public getCouponByIdService(id: number) {
    // return this.http.get('http://localhost:8080/company/get-coupon/' + id);
    return this.http.get(this.prefixCompanyUrl + 'get-coupon/' + id);
  }

  public getCompanyInfo() {
    // return this.http.get('http://localhost:8080/company/company-info');
    return this.http.get(this.prefixCompanyUrl + 'company-info');
  }

  public getCouponByPriceService(price: number) {
    // return this.http.get('http://localhost:8080/company/coupon-by-price?price=' + price);
    return this.http.get(this.prefixCompanyUrl + 'coupon-by-price?price=' + price);
  }

  public getCouponByDateService(date: string) {
    // return this.http.get('http://localhost:8080/company/coupon-by-date?date=' + date);
    return this.http.get(this.prefixCompanyUrl + 'coupon-by-date?date=' + date);
  }

  public getCouponByTypeService(type: string) {
    // return this.http.get('http://localhost:8080/company/coupon-by-type?type=' + type);
    return this.http.get(this.prefixCompanyUrl + 'coupon-by-type?type=' + type);
  }

  /**********************************************************************************/
  /*********************Services for the logout method*******************************/
  /**********************************************************************************/
  public logOutService(request, response) {
    return this.http.post(this.prefixLogOutUrl + 'logout', request, response);
  }

}
