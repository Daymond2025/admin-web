import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersdetailsComponent } from './providersdetails.component';

describe('ProvidersdetailsComponent', () => {
  let component: ProvidersdetailsComponent;
  let fixture: ComponentFixture<ProvidersdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvidersdetailsComponent]
    });
    fixture = TestBed.createComponent(ProvidersdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
