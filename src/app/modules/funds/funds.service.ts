import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../../core/constants/api';
import { Fund } from '../../shared/models/fund';

@Injectable({
  providedIn: 'root'
})
export class FundsService {
  constructor( private http: HttpClient ) {
  }

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${URL}/funds`);
  }
}
