import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {URL} from '../../core/constants/api';
import {Fund, TFund} from '../../shared/models/fund';

@Injectable({
  providedIn: 'root'
})

export class FundsService {
  private subject = new Subject<TFund>();
  api: string = `${URL}/funds`;

  constructor(private http: HttpClient) {
  }

  getAll = (): Observable<Fund[]> => this.http.get<Fund[]>(this.api);

  getById = (id: number): Observable<Fund> => this.http.get<Fund>(`${this.api}/${id}`);

  getSavedFund = (): Observable<TFund> => this.subject.asObservable();

  remove = (id: number) => this.http.delete(`${this.api}/delete/${id}`);

  create = (fund: Fund): void => {
    this.http.post(`${this.api}/create`, fund)
      .subscribe((res) => {
        this.saveFundsToSubject(res as Fund);
      });
  };

  update = (fund: Fund, id: number): Observable<Fund> => {
    return this.http.put<Fund>(`${this.api}/update/${id}`, fund);
  };

  saveFundsToSubject = (fund: Fund): void => this.subject.next({fund});
}
