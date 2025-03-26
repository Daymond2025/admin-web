import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotsolderComponent } from './notsolder.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotsolderComponent', () => {
  let component: NotsolderComponent;
  let fixture: ComponentFixture<NotsolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotsolderComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(NotsolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
