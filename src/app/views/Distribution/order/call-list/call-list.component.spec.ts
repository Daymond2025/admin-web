import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'

import { sCallListComponent } from './call-list.component';

describe('sCallListComponent', () => {
  let component: sCallListComponent;
  let fixture: ComponentFixture<sCallListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sCallListComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(sCallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
