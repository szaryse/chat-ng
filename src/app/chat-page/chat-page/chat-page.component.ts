import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/websocket.service';
import { BotMessage } from '../../core/types/messages';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  messages: BotMessage[] = [];

  constructor(
    private websocketService: WebsocketService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.messageService
      .getMessages()
      .pipe(catchError((e) => this.handleError(e)))
      .subscribe((data) => this.setMessages(data));

    this.websocketService.getMessage().subscribe((message) => {
      if (Array.isArray(message) && message.length) {
        this.messages = this.messages.concat(message);
      }
      if (!Array.isArray(message)) {
        this.messages.push(message);
      }
    });
  }

  private setMessages(data: BotMessage | BotMessage[]) {
    if (Array.isArray(data)) {
      this.messages = data;
    } else {
      this.messages.push(data);
    }
  }

  private handleError(error: HttpErrorResponse) {
    return [this.messageService.createErrorMessage(error.message)];
  }
}
