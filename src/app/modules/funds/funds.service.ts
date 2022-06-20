import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {URL} from '../../core/constants/api';
import {Fund} from '../../shared/models/fund';

@Injectable({
  providedIn: 'root'
})

export class FundsService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getFunds = (): Observable<Fund[]> => this.http.get<Fund[]>(`${URL}/funds`);

  create = (fund: Fund): void => {
    this.http.post(`${URL}/funds/create`, fund)
      .subscribe((res) => {
        this.saveFundsToSubject(res as Fund);
      });
  };

  saveFundsToSubject = (fund: Fund): void => this.subject.next({fund});

  getSavedFund = (): Observable<any> => this.subject.asObservable();
}
