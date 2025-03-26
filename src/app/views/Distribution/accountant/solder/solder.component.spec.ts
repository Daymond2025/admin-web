import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolderComponent } from './solder.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolderComponent', () => {
  let component: SolderComponent;
  let fixture: ComponentFixture<SolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SolderComponent,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
