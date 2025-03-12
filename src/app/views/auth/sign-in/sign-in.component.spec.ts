import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
     
      imports:[SignInComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
