import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Link } from './models/link.model';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private url =
    'https://link-sharing-app-caae8-default-rtdb.firebaseio.com/links';
  private http = inject(HttpClient);

  links$ = this.http.get<Link[]>(`${this.url}.json`);

  updateLinks(links: Link[]) {
    return this.http.put<Link[]>(`${this.url}.json`, links);
  }
}
