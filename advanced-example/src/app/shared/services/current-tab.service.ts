import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  getAppliedColorHexByTab,
  getCurrentTab,
  getHostFromTab,
  getUrlFromTab,
} from '../utils';
import { AppliedColorsService } from './applied-colors.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentTabService {
  private authorizedSubject = new BehaviorSubject<boolean>(false);
  readonly authorized$ = this.authorizedSubject.asObservable();

  private hostSubject = new BehaviorSubject<string>('');
  readonly host$ = this.hostSubject.asObservable();

  private borderColorSubject = new BehaviorSubject<string>('');
  readonly borderColor$ = this.borderColorSubject.asObservable();

  private hasBorderColorSubject = new BehaviorSubject<boolean>(false);
  readonly hasBorderColor$ = this.hasBorderColorSubject.asObservable();

  constructor(private appliedColorsService: AppliedColorsService) {}

  async load(): Promise<void> {
    const tab = await getCurrentTab();

    const url = getUrlFromTab(tab);
    this.setAuthorized(url.protocol.indexOf('http') === 0);
    this.setHost(getHostFromTab(tab));

    this.appliedColorsService.appliedColors$.subscribe((appliedColors) => {
      const color = getAppliedColorHexByTab(appliedColors, tab);
      this.initBorderColor(color);
    });
  }

  setAuthorized(authorized: boolean): void {
    this.authorizedSubject.next(authorized);
  }

  setHost(host: string): void {
    this.hostSubject.next(host);
  }

  initBorderColor(color: string) {
    this.hasBorderColorSubject.next(color !== '');
    this.borderColorSubject.next(color);
  }

  async setBorderColor(color: string) {
    if (color === '') {
      throw new Error("'color' does not be empty.");
    }
    const tab = await getCurrentTab();
    this.appliedColorsService.setAppliedColorByTab(tab, color);
  }

  async removeBorderColor() {
    const tab = await getCurrentTab();
    this.appliedColorsService.removeAppliedColorByTab(tab);
  }
}
