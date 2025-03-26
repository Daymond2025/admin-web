import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponent } from './new.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NewComponent', () => {
  let component: NewComponent;
  let fixture: ComponentFixture<NewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewComponent,HttpClientTestingModule],
      providers:[
                    {
                      provide: ActivatedRoute,
                      useValue: {
                        queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
            
                      }
                    }
                  ]
    });
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
