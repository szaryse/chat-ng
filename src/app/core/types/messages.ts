export enum MessageTypes {
  // Text messages
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING',
  // Parsed messages
  Parsed = 'PARSED',
  Join = 'JOIN',
  Part = 'PART',
}

export type Tags = {
  chatterColor: string;
  displayUsername: string;
  rawTag: string;
};

export type Source = {
  nick: string;
  host: string;
};

export enum Command {
  Join,
  Part,
  Ping,
  PrivMsg,
  Skipped,
  Unhandled,
}

export type ParsedMessage = {
  tags: Tags;
  source: Source | null;
  command: Command;
  rawParameters: string;
};

export type BotMessage = {
  id: string;
  messageType: MessageTypes;
  text: string;
  message: ParsedMessage | null;
  time: string;
};

export type Messages = BotMessage | BotMessage[];
