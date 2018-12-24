import { WebApiCompanyService } from './../../services/web-api-company.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';
import { MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {

  newCoupon: Coupon = new Coupon(null, '', null, null, null, '', '', null, '');
  caption = 'Create A New Coupon';
  createCouponForm: FormGroup;
  date = new Date();
  types: SelectItem[];
  couponTitle: string;

  /*
  At the constructor we inject
  1. FormBuilder for the favor validation of the forms
  2. WebApiAdminService for the favor of the services
  3. MessageService for the favor of the custom messages
  */
  constructor(private formBuilder: FormBuilder,  private companyService: WebApiCompanyService, private messageService: MessageService) {

    // This date is reset to contains only date without time in order to compare dates based on day and not day and time
    this.date.setSeconds(0);
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setMilliseconds(0);

    // initialize the coupon types for the favor of the drop down list
    this.types = [
      {label: 'Resturant' , value: 'RESTURANT'},
      {label: 'Electricity', value: 'ELECTRICITY'},
      {label: 'Food', value: 'FOOD'},
      {label: 'Health', value: 'HEALTH'},
      {label: 'Sports', value: 'SPORTS'},
      {label: 'Camping', value: 'CAMPING'},
      {label: 'Travelling', value: 'TRAVELLING'},
    ];


    // In the code we define the validation for each input.
    // For the dates there are three addtioanl validations (the methods are defined at the end of this file)
    this.createCouponForm = formBuilder.group ({
       'title': [null, Validators.compose( [Validators.required])],
       'startDate': [null, Validators.compose( [Validators.required, this.checkDate.bind(this), this.checkStartDate.bind(this)])],
       'endDate': [null, Validators.compose( [Validators.required, this.checkDate.bind(this), this.checkEndDate.bind(this)])],
       'amount': [null, Validators.compose( [Validators.required])],
       'type': [null, Validators.compose( [Validators.required])],
       'message': [null, Validators.compose( [Validators.required])],
       'price': [null, Validators.compose( [Validators.required])],
       'image': [null, Validators.compose( [Validators.required])]
    });
  }

  ngOnInit() {

  }

  // This method is activated afte the user finished to enter all the coupon infromation into the form and activate the save button.
  // It activates the addNewCouponService service.
  public addNewCoupon() {
    console.log(this.newCoupon);
    this.couponTitle = this.newCoupon.title;
    this.companyService.addNewCouponService(this.newCoupon).subscribe
    (
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'Company Was Added', detail: this.couponTitle +
         ' Was Added Successfully'});
      },
      (error) => {
         this.messageService.add({severity: 'error', summary: 'Company Was\'t Added', detail: error._body});
      }
    );
    this.newCoupon = new Coupon(null, '', null, null, null, '', '', null, '');
  }


  /* The following 3 methods responsible for the dates validations
    1. checkDate - checks if the date selected is greated than today
    2. checkStartDate - checks if the start date is less than the end date
    3. checkEndDate - checks if the end date is greater than start date
  */
  checkDate(control: FormControl): { [s: string]: boolean} {
    if ( control.value !== null && control.value < this.date) {
      return {'DateMustBeGreaterThanSysdate': true};
    }
    return null;
  }

  checkStartDate(control: FormControl): { [s: string]: boolean} {
    if ( this.newCoupon.endDate !== null && control.value > this.newCoupon.endDate) {
      return {'StartDateMustBeLessThanEndDate': true};
    }
    // this.newCoupon.startDate = this.newCoupon.startDate;
    return null;
  }

  checkEndDate(control: FormControl): { [s: string]: boolean} {
    if ( this.newCoupon.startDate !== null && control.value < this.newCoupon.startDate) {
      return {'EndDateMustBeGreaterThanStartDate': true};
    }
    // this.newCoupon.endDate = this.newCoupon.endDate;
    return null;
  }

}
