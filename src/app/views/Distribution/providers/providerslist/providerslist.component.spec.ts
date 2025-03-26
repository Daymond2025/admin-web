import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderslistComponent } from './providerslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProviderslistComponent', () => {
  let component: ProviderslistComponent;
  let fixture: ComponentFixture<ProviderslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderslistComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                              queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(ProviderslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
