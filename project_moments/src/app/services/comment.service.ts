import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environment/environment';

import { IComment } from '../interfaces/IComment';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _baseApiUrl = environment.baseApiUrl;
  private _apiUrl = this._baseApiUrl + '/api/moments';

  constructor(private http: HttpClient) {}

  createComment(comment: IComment): Observable<IResponse<IComment>> {
    console.log(this._apiUrl + `/${comment.momentId}/comments`);
    return this.http.post<IResponse<IComment>>(
      this._apiUrl + `/${comment.momentId}/comments`,
      comment
    );
  }
}
