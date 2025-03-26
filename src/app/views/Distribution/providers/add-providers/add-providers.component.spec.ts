import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvidersComponent } from './add-providers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddProvidersComponent', () => {
  let component: AddProvidersComponent;
  let fixture: ComponentFixture<AddProvidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddProvidersComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                              queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(AddProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
