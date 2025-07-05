import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // مهم جدًا عشان التحريك والشكل

@Injectable({
  providedIn: 'root',
})
export class NotyfService {
  private notyf: Notyf | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf({
        duration: 3000,
        position: { x: 'right', y: 'top' },
      });
    }
  }
  success(message: string) {
    this.notyf?.success(message);
  }

  error(message: string) {
    this.notyf?.error(message);
  }

  info(message: string) {
    this.notyf?.open({ type: 'info', message });
  }

  warning(message: string) {
    this.notyf?.open({ type: 'warning', message });
  }
}
