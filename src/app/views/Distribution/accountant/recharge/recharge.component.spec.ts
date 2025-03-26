import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeComponent } from './recharge.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RechargeComponent', () => {
  let component: RechargeComponent;
  let fixture: ComponentFixture<RechargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RechargeComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(RechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
