import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppliedColorsService } from '@shared/services/applied-colors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-options-applied-colors',
  templateUrl: './options-applied-colors.component.html',
  styleUrls: ['./options-applied-colors.component.scss'],
})
export class OptionsAppliedColorsComponent implements OnInit, OnDestroy {
  readonly colors$ = this.appliedColorsService.colors$;
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: ChangeDetectorRef,
    private appliedColorsService: AppliedColorsService
  ) {}

  ngOnInit(): void {
    // TODO: analyse and improve this trick, related to chrome.storage.sync
    //  and BehaviorSubject in the AppliedColorsService.
    this.subscription = this.colors$.subscribe(() =>
      setTimeout(() => this.ref.detectChanges())
    );

    this.appliedColorsService.load();
  }

  remove(host: string): void {
    console.log('host', host);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
