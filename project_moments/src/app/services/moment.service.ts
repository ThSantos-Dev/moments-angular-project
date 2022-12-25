import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { IResponse } from '../interfaces/IResponse';
import { IMoment } from './../interfaces/IMoment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private _baseApiUrl = environment.baseApiUrl;
  private _apiUrl = this._baseApiUrl + '/api/moments';

  constructor(private http: HttpClient) {}

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this._apiUrl);
  }

  getMoment(id: number): Observable<IResponse<IMoment>> {
    return this.http.get<IResponse<IMoment>>(this._apiUrl + `/${id}`);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this._apiUrl, formData);
  }

  removeMoment(id: number) {
    return this.http.delete(this._apiUrl + `/${id}`);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(this._apiUrl + `/${id}`, formData);
  }
}
