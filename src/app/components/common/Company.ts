import { Coupon } from './Coupon';

export class Company {

  constructor(public id: number, public compName: string, public email: string, public password: string, public coupons?: Coupon[]) {}

}
