import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolderComponent } from './solder.component';

describe('SolderComponent', () => {
  let component: SolderComponent;
  let fixture: ComponentFixture<SolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolderComponent]
    });
    fixture = TestBed.createComponent(SolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
