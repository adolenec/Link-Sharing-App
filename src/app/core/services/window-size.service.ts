import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';
import { WindowSizeEnum } from '../enums/window-size.enum';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  private windowSize$ = fromEvent(window, 'resize').pipe(
    startWith(window),
    map(() => window),
    map((window: Window) => this.getWindowSize(window.innerWidth))
  );

  windowSize = toSignal(this.windowSize$, { initialValue: window.innerWidth });

  private getWindowSize(innerWidth: number): WindowSizeEnum {
    if (innerWidth <= WindowSizeEnum.Small) return WindowSizeEnum.Small;
    if (innerWidth <= WindowSizeEnum.Medium) return WindowSizeEnum.Medium;
    if (innerWidth <= WindowSizeEnum.Large) return WindowSizeEnum.Large;
    return WindowSizeEnum.ExtraLarge;
  }
}
