import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualityComponent } from './actuality.component';

describe('ActualityComponent', () => {
  let component: ActualityComponent;
  let fixture: ComponentFixture<ActualityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualityComponent]
    });
    fixture = TestBed.createComponent(ActualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
