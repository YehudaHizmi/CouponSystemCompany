import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCompanyInfoComponent } from './get-company-info.component';

describe('GetCompanyInfoComponent', () => {
  let component: GetCompanyInfoComponent;
  let fixture: ComponentFixture<GetCompanyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCompanyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
