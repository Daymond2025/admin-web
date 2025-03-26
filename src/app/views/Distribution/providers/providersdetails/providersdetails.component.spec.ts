import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersdetailsComponent } from './providersdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProvidersdetailsComponent', () => {
  let component: ProvidersdetailsComponent;
  let fixture: ComponentFixture<ProvidersdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProvidersdetailsComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                              queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(ProvidersdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
