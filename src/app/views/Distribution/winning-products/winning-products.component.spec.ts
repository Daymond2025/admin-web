import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningProductsComponent } from './winning-products.component';

describe('WinningProductsComponent', () => {
  let component: WinningProductsComponent;
  let fixture: ComponentFixture<WinningProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinningProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinningProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
