import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderscommandesComponent } from './providerscommandes.component';

describe('ProviderscommandesComponent', () => {
  let component: ProviderscommandesComponent;
  let fixture: ComponentFixture<ProviderscommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderscommandesComponent]
    });
    fixture = TestBed.createComponent(ProviderscommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
