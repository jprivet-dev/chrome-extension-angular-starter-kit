import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_COLORS } from '../storage.constant';
import {
  getColorTextByHost,
  getCurrentTab,
  getHostFromTabUrl,
  getUrlFromTab,
  removeColorByHost,
  setColorByHost,
} from '../utils';
import Tab = chrome.tabs.Tab;

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

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    const tab = await getCurrentTab();
    const url = getUrlFromTab(tab);

    this.setAuthorized(url.protocol.indexOf('http') === 0);
    this.setHost(url.host);

    chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
      const color = getColorTextByHost(colors, this.getHost());

      if (color === '') {
        return;
      }

      this.setBorderColor(color);
    });
  }

  setAuthorized(authorized: boolean): void {
    this.authorizedSubject.next(authorized);
  }

  setHost(host: string): void {
    this.hostSubject.next(host);
  }

  getHost(): string {
    return this.hostSubject.getValue();
  }

  async setBorderColor(color: string): Promise<void> {
    if (color === '') {
      throw new Error("'color' does not be empty.");
    }

    this.hasBorderColorSubject.next(true);
    this.borderColorSubject.next(color);
    const tab = await getCurrentTab();

    return chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
      chrome.storage.sync
        .set({
          [STORAGE_COLORS]: setColorByHost(
            colors,
            getHostFromTabUrl(tab),
            tab.url as string,
            color
          ),
        })
        .then(() => this.executeScript(tab));
    });
  }

  async removeBorderColor(): Promise<void> {
    this.hasBorderColorSubject.next(false);
    const tab = await getCurrentTab();

    chrome.storage.sync.get(STORAGE_COLORS, ({ colors }) => {
      chrome.storage.sync
        .set({
          [STORAGE_COLORS]: removeColorByHost(colors, this.getHost()),
        })
        .then(() => this.executeScript(tab));
    });
  }

  private executeScript(tab: Tab): void {
    chrome.scripting.executeScript({
      target: { tabId: tab.id as number },
      files: ['content.js', 'runtime.js'],
    });
  }
}
