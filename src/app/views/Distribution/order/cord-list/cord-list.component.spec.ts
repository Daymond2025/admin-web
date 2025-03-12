import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'

import { sCordListComponent } from './cord-list.component';

describe('sCordListComponent', () => {
  let component: sCordListComponent;
  let fixture: ComponentFixture<sCordListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sCordListComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(sCordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
