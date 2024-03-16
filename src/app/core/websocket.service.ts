import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { BotMessage, Messages } from './types/messages';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private rxWebsocket = webSocket({
    url: 'ws://localhost:3001',
    openObserver: {
      next: () => {
        const message = this.messageService.createInfoMessage(
          'The chatbot is connected.'
        );

        this.setMessage(message);
      },
    },
  });
  private messageSource = new Subject<Messages>();

  constructor(private messageService: MessageService) {
    this.rxWebsocket.subscribe({
      next: (msg) => {
        const receivedMessages = msg as BotMessage[];

        this.setMessage(receivedMessages);
        console.log('message received: ' + JSON.stringify(msg));
      },
      error: (err) => {
        if (err?.target?.readyState === 3) {
          const error = this.messageService.createErrorMessage('ERROR');

          this.setMessage(error);
        } else {
          console.log(err);
        }
      },
      complete: () => {
        const error = this.messageService.createInfoMessage(
          'INFO: Connection is closed'
        );

        this.setMessage(error);
      },
    });
  }

  getMessage(): Observable<Messages> {
    return this.messageSource.asObservable();
  }

  private setMessage(message: Messages) {
    return this.messageSource.next(message);
  }

  sendCodeAndScope(code: string, scope: string) {
    const message = {
      event: 'events',
      data: {
        code,
        scope,
      },
    };

    this.rxWebsocket.next(message);
  }
}
