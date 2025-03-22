import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersproductsComponent } from './providersproducts.component';

describe('ProvidersproductsComponent', () => {
  let component: ProvidersproductsComponent;
  let fixture: ComponentFixture<ProvidersproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvidersproductsComponent]
    });
    fixture = TestBed.createComponent(ProvidersproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
