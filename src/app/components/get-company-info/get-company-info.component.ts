import { MessageService } from 'primeng/api';
import { Company } from './../common/Company';
import { WebApiCompanyService } from './../../services/web-api-company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-company-info',
  templateUrl: './get-company-info.component.html',
  styleUrls: ['./get-company-info.component.css']
})
export class GetCompanyInfoComponent implements OnInit {

  requestedCompany: Company = new Company(null, '', '', '');
  caption = 'Company Information';

  /*
  At the constructor we inject
  1. WebApiAdminService for the favor of the services
  2. MessageService for the favor of the custom messages
  */
  constructor(private companyService: WebApiCompanyService, private messageService: MessageService) {
    this.getCompanyInfo();
  }

  // This method is activated from the constructor every time the user rout to compny info link
  public getCompanyInfo() {
    this.companyService.getCompanyInfo().subscribe(
      (resp) => {
        this.requestedCompany = resp.json();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Data Unavailable', detail: error._body});
      });
  }

  ngOnInit() {
  }

}
