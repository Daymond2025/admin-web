import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnnoncesComponent } from './details-annonces.component';

describe('DetailsAnnoncesComponent', () => {
  let component: DetailsAnnoncesComponent;
  let fixture: ComponentFixture<DetailsAnnoncesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailsAnnoncesComponent]
    });
    fixture = TestBed.createComponent(DetailsAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
