import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponsByPriceComponent } from './get-coupons-by-price.component';

describe('GetCouponsByPriceComponent', () => {
  let component: GetCouponsByPriceComponent;
  let fixture: ComponentFixture<GetCouponsByPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponsByPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponsByPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
