import { Company } from './../common/Company';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/primeng';
import { WebApiCompanyService } from './../../services/web-api-company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  company:  Company = new Company(null, '', '', '');
  request: Request;
  response: Response;
  prefixLogOutUrl: string;



  constructor(private companyService: WebApiCompanyService,  private messageService: MessageService) {
    this.getCompanyInfo();
    this.prefixLogOutUrl = companyService.prefixLogOutUrl;

  }

  ngOnInit() {
    this.items = [
    {
      label: 'Coupon',
      items: [
          {label: 'Home',        icon: 'pi pi-fw pi-home',     routerLink:   '/allCoupons'         },
          {label: 'Coupon {Id}',      icon: 'pi pi-fw pi-file',     routerLink:   '/getCoupon'          },
          {label: 'Add {Single}',     icon: 'pi pi-fw pi-plus',     routerLink:   '/addCoupon'          },
          {label: 'Coupons {Price}',  icon: 'pi pi-fw pi-dollar',   routerLink:   '/getCouponsByPrice'  },
          {label: 'Coupons {Date}',   icon: 'pi pi-fw pi-calendar', routerLink:   '/getCouponsByDate'   },
          {label: 'Coupons {Type}',   icon: 'pi pi-fw pi-th-large', routerLink:   '/getCouponsByType'   }
        ]
      },
      {
        label: 'Company',
        items: [
            {label: 'Company Info',  icon: 'pi pi-fw pi-info', routerLink: '/companyInfo'}
        ]
      }
    ];
  }

  public getCompanyInfo() {
    this.companyService.getCompanyInfo().subscribe(
      (resp) => {
        this.company = resp.json();
      });
  }

  public logout() {
    this.companyService.logOutService(this.request, this.response).subscribe(
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'LogOut', detail: 'You Were Logged Out Successfully'});
        window.location.href = this.prefixLogOutUrl;
      },
      (error) => {
        this.messageService.add({severity: 'success', summary: 'LogOut', detail: 'Logged Out Failed'});
      });
  }

}
