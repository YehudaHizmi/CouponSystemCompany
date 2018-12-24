import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponsByDateComponent } from './get-coupons-by-date.component';

describe('GetCouponsByDateComponent', () => {
  let component: GetCouponsByDateComponent;
  let fixture: ComponentFixture<GetCouponsByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponsByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
