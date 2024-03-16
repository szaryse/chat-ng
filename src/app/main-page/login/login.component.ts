import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment.development';
import { WebsocketService } from '../../core/websocket.service';

const baseUrl = 'https://id.twitch.tv/oauth2/authorize';
const responseType = '?response_type=code';
const clientId = `&client_id=${environment.TTV_CLIENT_ID}`;
const redirectUri = '&redirect_uri=http://localhost:4200';
const botScope = '&scope=chat%3Aread';

const url = `${baseUrl}${responseType}${clientId}${redirectUri}${botScope}`;

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  url: string;
  code: string;
  scope: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private websocketService: WebsocketService
  ) {
    this.url = url;
    this.code = '';
    this.scope = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] && params['scope']) {
        this.code = params['code'];
        this.scope = params['scope'];

        this.websocketService.sendCodeAndScope(this.code, this.scope);
        this.router.navigate(['/chat']);
      }
    });
  }
}
