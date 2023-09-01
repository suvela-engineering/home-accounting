import { Injectable } from '@angular/core';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  getBaseUrl = () => { return "http://127.0.0.1:3003/api/" };

  getEntries = async (): Promise<Response> => {
    const response = await fetch(this.getBaseUrl() + "entries");
    return response;
  }
}
