import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopComponent } from './add-shop.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddShopComponent', () => {
  let component: AddShopComponent;
  let fixture: ComponentFixture<AddShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddShopComponent,HttpClientTestingModule],
      providers:[
              {
                provide: ActivatedRoute,
                useValue: {
                  queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
      
                }
              }
            ]
    });
    fixture = TestBed.createComponent(AddShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
