import {Component} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoalBase';

  constructor(private keycloakservice: KeycloakService) {
  }

  logout() {
    this.keycloakservice.logout();
  }
}
