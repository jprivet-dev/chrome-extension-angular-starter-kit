import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsPresetColorsComponent } from './options-preset-colors.component';

describe('OptionsPresetColorsComponent', () => {
  let component: OptionsPresetColorsComponent;
  let fixture: ComponentFixture<OptionsPresetColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsPresetColorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsPresetColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
