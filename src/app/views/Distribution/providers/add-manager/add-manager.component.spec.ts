import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagerComponent } from './add-manager.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddManagerComponent', () => {
  let component: AddManagerComponent;
  let fixture: ComponentFixture<AddManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddManagerComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                              queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(AddManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
