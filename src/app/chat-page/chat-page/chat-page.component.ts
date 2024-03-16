import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../core/websocket.service';
import { BotMessage } from '../../core/types/messages';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnInit {
  messages: BotMessage[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.getMessage().subscribe((message) => {
      if (Array.isArray(message) && message.length) {
        this.messages = this.messages.concat(message);
      }
      if (!Array.isArray(message)) {
        this.messages.push(message);
      }

      console.log(message);
    });
  }
}
