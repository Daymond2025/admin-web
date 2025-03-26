import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddComponent,HttpClientTestingModule],
      providers:[
                          {
                            provide: ActivatedRoute,
                            useValue: {
                              queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                  
                            }
                          }
                        ]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
