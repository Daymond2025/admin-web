import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnouncementsComponent } from './list-announcements.component';

describe('ListAnnouncementsComponent', () => {
  let component: ListAnnouncementsComponent;
  let fixture: ComponentFixture<ListAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(ListAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
