import { MessageService, SelectItem } from 'primeng/api';
import { WebApiCompanyService } from './../../services/web-api-company.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company-main-area',
  templateUrl: './company-main-area.component.html',
  styleUrls: ['./company-main-area.component.css']
})
export class CompanyMainAreaComponent implements OnInit {

  coupons: Coupon[] = [];
  cols: any[];
  caption = 'Company Main Management Area';
  coupon: Coupon = new Coupon(null, '', null, null, null, '', '', null, '');
  newCoupon: boolean;
  displayDialog: boolean;
  selectedCoupon: Coupon;
  couponTitle: string;
  numOfCoupons: number;
  DialogLeftButton = 'Delete';
  DialogRightButton = 'Update';
  types: SelectItem[];
  createCouponDialogForm: FormGroup;
  date = new Date();
  hasData = false;


  /*
  At the constructor we inject
  1. FormBuilder for the favor validation of the forms
  2. WebApiAdminService for the favor of the services
  3. MessageService for the favor of the custom messages
  */
  constructor(private formBuilder: FormBuilder, private companyService: WebApiCompanyService, private messageService: MessageService ) {

    // this.hasData = companyService.hasData;
    this.cols = companyService.couponCols;
    this.types = companyService.couponTypes;

    // This date is reset to contains only date without time in order to compare dates based on day and not day and time
    this.date.setSeconds(0);
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setMilliseconds(0);

    // In the code we define the validation for each input.
    // For the dates there are three addtioanl validations (the methods are defined at the end of this file)
    this.createCouponDialogForm = formBuilder.group ({
      'title': [null, Validators.compose( [Validators.required])],
      'startDate': [null, Validators.compose( [Validators.required, this.checkDate.bind(this), this.checkStartDate.bind(this)])],
      'endDate': [null, Validators.compose( [Validators.required, this.checkDate.bind(this), this.checkEndDate.bind(this)])],
      'amount': [null, Validators.compose( [Validators.required])],
      'type': [null, Validators.compose( [Validators.required])],
      'message': [null, Validators.compose( [Validators.required])],
      'price': [null, Validators.compose( [Validators.required])],
      'image': [null, Validators.compose( [Validators.required])]
   });

    this.getAllCoupons();
   }

  ngOnInit() {
  }

  // When this method is activated a pop up window is opening and a new coupon can be added
  showDialogToAdd() {
    this.newCoupon = true;
    this.coupon = new Coupon(null, '', null, null, null, '', '', null, '');
    this.displayDialog = true;
    this.createCouponDialogForm.reset();
    this.disabledInputs('Add');
    this.DialogLeftButton = 'Cancel';
    this.DialogRightButton = 'Save';

  }

  // When this method is activated a pop up window is opening and a new coupon can be edited
  onRowSelect(event) {
    this.newCoupon = false;
    // this.createCouponDialogForm.reset();
    this.coupon = this.cloneCoupon(event.data);
    this.displayDialog = true;
    this.disabledInputs('Update');
    this.DialogLeftButton = 'Delete';
    this.DialogRightButton = 'Update';
  }


  // This method is activated from onRowSelect in order to present the edited coupon
  cloneCoupon(coupon: Coupon): Coupon {
    const tempCoupon = new Coupon(null, '', null, null, null, '', '', null, '');
    // tslint:disable-next-line:forin
    for (const prop in coupon) {
      if (prop === 'startDate' || prop === 'endDate') {
        tempCoupon[prop] = new Date(coupon[prop]);
      } else {
        tempCoupon[prop] = coupon[prop];
      }
    }
    // console.log(tempCoupon);
    return tempCoupon;
  }

  // This method responsible for enabling and disabling editable inputs
  private disabledInputs(source: string) {
    this.createCouponDialogForm.disable();
    this.createCouponDialogForm.get('endDate').enable();
    this.createCouponDialogForm.get('price').enable();
    // this.createCouponDialogForm.get('title').disable();
    // this.createCouponDialogForm.get('startDate').disable();
    // this.createCouponDialogForm.get('endDate').enable();
    // this.createCouponDialogForm.get('amount').disable();
    // this.createCouponDialogForm.get('type').disable();
    // this.createCouponDialogForm.get('message').disable();
    // this.createCouponDialogForm.get('price').enable();
    // this.createCouponDialogForm.get('image').disable();
    if (source === 'Add') {
      this.createCouponDialogForm.enable();
      // this.createCouponDialogForm.get('title').disable();
      // this.createCouponDialogForm.get('startDate').disable();
      // this.createCouponDialogForm.get('amount').disable();
      // this.createCouponDialogForm.get('type').disable();
      // this.createCouponDialogForm.get('message').disable();
      // this.createCouponDialogForm.get('image').disable();

    }

  }

  /* This method responsible to save the data in two cases:
     1. When a new coupon being added the addNewCouponService service is activated
     2. When an existing coupon being edited than the updateCouponService service is activated
  */
  save() {
    this.couponTitle = this.coupon.title;
    if (this.newCoupon) { // Add new company to DB
      this.companyService.addNewCouponService(this.coupon).subscribe(
        (resp) => {
          this.getAllCoupons();
          this.messageService.add({severity: 'success', summary: 'Coupon Was Added', detail: this.couponTitle +
          ' Was Added Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Coupon Was\'t Added', detail: error._body});
        });
    } else { // Update the company
      this.companyService.updateCouponService(this.coupon).subscribe(
        () => {
          this.getAllCoupons();
          this.messageService.add({severity: 'success', summary: 'Coupon Was Updated', detail: this.couponTitle +
          ' Was Updated Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Coupon Was\'t Updated', detail: error._body});
        });
    }
    // this.coupon = null;
    this.displayDialog = false;

  }

   // When a coupon is deleted than this method is activated and it activate the deleteCouponService service
   delete() {
    this.couponTitle = this.coupon.title;
    if (!this.newCoupon) {
    this.companyService.deleteCouponService(this.selectedCoupon).subscribe(
         () => {
           this.getAllCoupons();
            this.messageService.add({severity: 'success', summary: 'Coupon Was Deleted', detail: this.couponTitle +
            ' Was Deleted Successfully'});
        },
        (error) => {
          this.messageService.add({severity: 'error', summary: 'Customer Was\'t Deleted', detail: error._body});
        });
     }
     // this.coupon = null;
     // this.createCouponDialogForm.reset();
     this.displayDialog = false;
   }

  // This method is activated from the constructor - in order to intialize the data for the first time
  getAllCoupons() {
    this.companyService.getAllCouponsService().subscribe(
      (resp) => {
        this.hasData = true;
        this.coupons = resp.json();
        this.numOfCoupons = this.coupons.length;
        // Make default sort of companies array
        this.sortArry(this.coupons);
    },
    (error) => {
      if (this.hasData) {
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      }
    });
  }

  // This function responsible to sort the array accoring to the title of the coupon
  private sortArry(arryToSort: Coupon[]) {
    arryToSort.sort((a: any, b: any) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /* The following 3 methods responsible for the dates validations
    1. checkDate - checks if the date selected is greated than today
    2. checkStartDate - checks if the start date is less than the end date
    3. checkEndDate - checks if the end date is greater than start date
  */
  private checkDate(control: FormControl): { [s: string]: boolean} {
    if ( control.value !== null && control.value < this.date) {
      return {'DateMustBeGreaterThanSysdate': true};
    }
    return null;
  }

  private checkStartDate(control: FormControl): { [s: string]: boolean} {
    if ( this.coupon.endDate !== null && control.value > this.coupon.endDate) {
      return {'StartDateMustBeLessThanEndDate': true};
    }
    // this.newCoupon.startDate = this.newCoupon.startDate;
    return null;
  }

  private checkEndDate(control: FormControl): { [s: string]: boolean} {
    if ( this.coupon.startDate !== null && control.value < this.coupon.startDate) {
      return {'EndDateMustBeGreaterThanStartDate': true};
    }
    // this.newCoupon.endDate = this.newCoupon.endDate;
    return null;
  }


}
