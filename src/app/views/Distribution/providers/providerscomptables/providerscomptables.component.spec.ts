import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderscomptablesComponent } from './providerscomptables.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProviderscomptablesComponent', () => {
  let component: ProviderscomptablesComponent;
  let fixture: ComponentFixture<ProviderscomptablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderscomptablesComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                              queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(ProviderscomptablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
