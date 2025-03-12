import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'

import { DetailUserComponent } from './detail-user.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetailUserComponent', () => {
  let component: DetailUserComponent;
  let fixture: ComponentFixture<DetailUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailUserComponent,HttpClientTestingModule],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap

          }
        }
      ]
    });
    fixture = TestBed.createComponent(DetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
