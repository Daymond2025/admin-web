import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordListComponent } from './cord-list.component';

describe('CordListComponent', () => {
  let component: CordListComponent;
  let fixture: ComponentFixture<CordListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CordListComponent]
    });
    fixture = TestBed.createComponent(CordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
