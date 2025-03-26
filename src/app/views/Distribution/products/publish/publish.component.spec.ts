import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishComponent } from './publish.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PublishComponent', () => {
  let component: PublishComponent;
  let fixture: ComponentFixture<PublishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublishComponent,HttpClientTestingModule],
      providers:[
                    {
                      provide: ActivatedRoute,
                      useValue: {
                        queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
            
                      }
                    }
                  ]
          
      
    });
    fixture = TestBed.createComponent(PublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


