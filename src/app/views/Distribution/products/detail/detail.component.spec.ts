import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailComponent } from "./detail.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("DetailComponent", () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: (key: string) => "123" }), // Simule queryParamMap
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
