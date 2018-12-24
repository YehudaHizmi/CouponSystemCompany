import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMainAreaComponent } from './company-main-area.component';

describe('CompanyMainAreaComponent', () => {
  let component: CompanyMainAreaComponent;
  let fixture: ComponentFixture<CompanyMainAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMainAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
