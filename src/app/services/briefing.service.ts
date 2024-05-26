import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequest } from '../interfaces/request.interface';
import { Observable } from 'rxjs';
import { IBriefingResponse } from '../interfaces/response.interface';

/**
 * This service is responsible for briefing API operations
 */
@Injectable({
  providedIn: 'root',
})
export class BriefingService {
  private readonly baseUrl = 'https://ogcie.iblsoft.com/ria/opmetquery';

  /**
   * BriefingService constructor
   * @param {HttpClient} httpClient Angular HttpClient
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * This method creates a briefing
   * @param {IRequest} payload Request payload
   * @returns {Observable<IBriefingResponse>} Observable with briefing response
   */
  public createBriefing(payload: IRequest): Observable<IBriefingResponse> {
    return this.httpClient.post<IBriefingResponse>(this.baseUrl, payload);
  }
}
