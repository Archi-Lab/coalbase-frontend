import {Component} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {CacheHelper} from "angular4-hal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoalBase';

  constructor(private readonly keycloakService: KeycloakService) {
    CacheHelper.isActive = false;
  }

  logout() {
    this.keycloakService.logout();
  }
}
