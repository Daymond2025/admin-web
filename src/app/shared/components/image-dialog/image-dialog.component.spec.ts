import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogComponent } from './image-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ImageDialogComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // ✅ Mock des données du dialog
        { provide: MatDialogRef, useValue: { close: () => {} } } // ✅ Mock de MatDialogRef
      ]
    });
    fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
