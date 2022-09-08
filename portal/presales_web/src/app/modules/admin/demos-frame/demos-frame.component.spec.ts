import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosFrameComponent } from './demos-frame.component';

describe('DemosFrameComponent', () => {
  let component: DemosFrameComponent;
  let fixture: ComponentFixture<DemosFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemosFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemosFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
