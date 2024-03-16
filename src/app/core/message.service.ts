import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BotMessage, MessageTypes } from './types/messages';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  historyMessagesUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<BotMessage[]> {
    return this.http.get<BotMessage[]>(this.historyMessagesUrl).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error('An error occurred:', error.message);
          }
        },
      })
    );
  }

  createErrorMessage(text: string): BotMessage {
    return {
      id: uuidv4(),
      messageType: MessageTypes.Error,
      message: null,
      text,
      time: new Date().toLocaleTimeString('pl-pl'),
    };
  }

  createInfoMessage(text: string): BotMessage {
    return {
      id: uuidv4(),
      messageType: MessageTypes.Info,
      message: null,
      text,
      time: new Date().toLocaleTimeString('pl-pl'),
    };
  }
}
