import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppliedColor } from '@shared/color.model';
import { AppliedColorsService } from '@shared/services/applied-colors.service';
import { getHostFromTab } from '@shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-options-applied-colors',
  templateUrl: './options-applied-colors.component.html',
  styleUrls: ['./options-applied-colors.component.scss'],
})
export class OptionsAppliedColorsComponent implements OnInit, OnDestroy {
  readonly appliedColors$ = this.appliedColorsService.appliedColors$;
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private appliedColorsService: AppliedColorsService
  ) {}

  ngOnInit(): void {
    this.appliedColorsService.load();

    // TODO: analyse and improve this trick, related to chrome.storage.sync
    //  and BehaviorSubject in the AppliedColorsService.
    this.subscription = this.appliedColors$.subscribe(() =>
      setTimeout(() => this.ref.detectChanges())
    );
  }

  remove(appliedColor: AppliedColor): void {
    this.appliedColorsService.removeAppliedColorByTab(appliedColor.tab);
  }

  url(appliedColor: AppliedColor): string {
    return appliedColor.tab.url as string;
  }

  host(appliedColor: AppliedColor): string {
    return getHostFromTab(appliedColor.tab);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
