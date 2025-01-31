import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeorderComponent } from './badgeorder.component';

describe('BadgeorderComponent', () => {
  let component: BadgeorderComponent;
  let fixture: ComponentFixture<BadgeorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeorderComponent]
    });
    fixture = TestBed.createComponent(BadgeorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
