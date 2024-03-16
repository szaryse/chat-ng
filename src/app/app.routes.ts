import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { ChatPageComponent } from './chat-page/chat-page/chat-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'chat', component: ChatPageComponent },
];
