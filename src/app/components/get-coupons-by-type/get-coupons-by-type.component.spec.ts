import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponsByTypeComponent } from './get-coupons-by-type.component';

describe('GetCouponsByTypeComponent', () => {
  let component: GetCouponsByTypeComponent;
  let fixture: ComponentFixture<GetCouponsByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponsByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
