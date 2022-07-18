import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsAppliedColorsComponent } from './options-applied-colors.component';

describe('OptionsAppliedColorsComponent', () => {
  let component: OptionsAppliedColorsComponent;
  let fixture: ComponentFixture<OptionsAppliedColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsAppliedColorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsAppliedColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
