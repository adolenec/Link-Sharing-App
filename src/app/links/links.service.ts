import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Link } from './models/link.model';
import { PLATFORMS } from '../shared/helpers/links';
import { map } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LinkPreview } from './models/link-preview.model';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private url =
    'https://link-sharing-app-caae8-default-rtdb.firebaseio.com/links.json';
  private http = inject(HttpClient);
  private platform = PLATFORMS;

  formLinks = signal<Link[]>([]);

  links$ = this.http.get<Link[]>(this.url);

  updateLinks(links: Link[]) {
    return this.http.put<Link[]>(this.url, links);
  }

  previewLinks$ = toObservable(this.formLinks).pipe(
    map((links) => {
      const platformIds = links.map((link) => link.platformId);
      const filteredPlatformIds = platformIds.filter((id) => id !== null); //filter form array items with no value
      return filteredPlatformIds.map((id) =>
        this.platform.find((p) => p?.id === id)
      ) as LinkPreview[];
    })
  );

  previewLinks = toSignal(this.previewLinks$, {
    initialValue: [] as LinkPreview[],
  });
}
