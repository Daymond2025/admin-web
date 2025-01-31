import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActualityComponent } from './create-actuality.component';

describe('CreateActualityComponent', () => {
  let component: CreateActualityComponent;
  let fixture: ComponentFixture<CreateActualityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActualityComponent]
    });
    fixture = TestBed.createComponent(CreateActualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
