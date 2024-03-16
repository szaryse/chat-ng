import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BotMessage, MessageTypes } from './types/messages';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

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
