import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CordDetailComponent } from './cord-detail.component';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('CordDetailComponent', () => {
  let component: CordDetailComponent;
  let fixture: ComponentFixture<CordDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CordDetailComponent,HttpClientTestingModule], // Déclare le composant à tester
      providers:[
                                {
                                  provide: ActivatedRoute,
                                  useValue: {
                                    queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap
                        
                                  }
                                }
                              ]
    });
    fixture = TestBed.createComponent(CordDetailComponent); // Crée l'instance du composant
    component = fixture.componentInstance; // Accède à l'instance du composant
    fixture.detectChanges(); // Détecte les changements dans le composant
  });

  it('devrait créer', () => {
    expect(component).toBeTruthy(); // Vérifie que le composant a bien été créé
  });
});
