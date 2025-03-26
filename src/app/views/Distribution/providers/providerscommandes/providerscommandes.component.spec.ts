import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderscommandesComponent } from './providerscommandes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProviderscommandesComponent', () => {
  let component: ProviderscommandesComponent;
  let fixture: ComponentFixture<ProviderscommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProviderscommandesComponent,HttpClientTestingModule],
      providers:[
                    {
                      provide: ActivatedRoute,
                      useValue: {
                        queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
            
                      }
                    }
                  ]
    });
    fixture = TestBed.createComponent(ProviderscommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
