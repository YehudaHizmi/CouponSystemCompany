import { WebApiCompanyService } from './../../services/web-api-company.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Coupon } from '../common/Coupon';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-get-coupon-by-id',
  templateUrl: './get-coupon-by-id.component.html',
  styleUrls: ['./get-coupon-by-id.component.css']
})
export class GetCouponByIdComponent implements OnInit {

  requestedCoupon: Coupon = new Coupon(null, '', null, null, null, '', '', null, '');
  caption = 'Coupon Information';
  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private companyService: WebApiCompanyService, private messageService: MessageService) {

  }

  // This method is activated once the user enter the coupon id and press the show button
  public getCoupon() {
    this.companyService.getCouponByIdService(this.requestedCoupon.id).subscribe(
      (resp) => {
        this.requestedCoupon = resp.json();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      });
  }

  ngOnInit() {}

}
