import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderscomptablesComponent } from './providerscomptables.component';

describe('ProviderscomptablesComponent', () => {
  let component: ProviderscomptablesComponent;
  let fixture: ComponentFixture<ProviderscomptablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderscomptablesComponent]
    });
    fixture = TestBed.createComponent(ProviderscomptablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
