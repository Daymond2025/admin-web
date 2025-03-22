import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotsolderComponent } from './notsolder.component';

describe('NotsolderComponent', () => {
  let component: NotsolderComponent;
  let fixture: ComponentFixture<NotsolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotsolderComponent]
    });
    fixture = TestBed.createComponent(NotsolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
