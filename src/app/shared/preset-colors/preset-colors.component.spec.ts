import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetColorsComponent } from './preset-colors.component';

describe('PresetColorsComponent', () => {
  let component: PresetColorsComponent;
  let fixture: ComponentFixture<PresetColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
