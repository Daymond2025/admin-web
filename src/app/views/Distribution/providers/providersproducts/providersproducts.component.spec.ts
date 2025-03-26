import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersproductsComponent } from './providersproducts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProvidersproductsComponent', () => {
  let component: ProvidersproductsComponent;
  let fixture: ComponentFixture<ProvidersproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProvidersproductsComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                             queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(ProvidersproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
