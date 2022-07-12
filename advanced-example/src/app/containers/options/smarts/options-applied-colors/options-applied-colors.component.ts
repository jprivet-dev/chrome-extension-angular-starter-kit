import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppliedColorsStoreService } from '@shared/services/applied-colors-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-options-applied-colors',
  templateUrl: './options-applied-colors.component.html',
  styleUrls: ['./options-applied-colors.component.scss'],
})
export class OptionsAppliedColorsComponent implements OnInit, OnDestroy {
  readonly appliedColors$ = this.appliedColorsStore.appliedColors$;
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private appliedColorsStore: AppliedColorsStoreService
  ) {}

  ngOnInit(): void {
    // TODO: analyse and improve this trick, related to chrome.storage.sync
    //  and BehaviorSubject in the AppliedColorsStoreService.
    this.subscription = this.appliedColors$.subscribe(() =>
      setTimeout(() => this.ref.detectChanges())
    );

    this.appliedColorsStore.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
