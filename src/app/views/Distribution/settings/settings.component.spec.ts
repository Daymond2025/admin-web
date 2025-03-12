import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SettingsComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
