import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getCurrentTab, getUrlFromTab } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class CurrentTabService {
  private authorizedSubject = new BehaviorSubject<boolean>(false);
  readonly authorized$ = this.authorizedSubject.asObservable();

  private hostSubject = new BehaviorSubject<string>('');
  readonly host$ = this.hostSubject.asObservable();

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    const tab = await getCurrentTab();
    const url = getUrlFromTab(tab);

    this.setAuthorized(url.protocol.indexOf('http') === 0);
    this.setHost(url.host);
  }

  setAuthorized(authorized: boolean): void {
    this.authorizedSubject.next(authorized);
  }

  getAuthorized(): boolean {
    return this.authorizedSubject.getValue();
  }

  setHost(host: string): void {
    this.hostSubject.next(host);
  }

  getHost(): string {
    return this.hostSubject.getValue();
  }
}
