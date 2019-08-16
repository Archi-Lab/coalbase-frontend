import { EventEmitter, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';


@Injectable()
export class KeyCloakUser {
  onUserChanged = new EventEmitter();

  private _id: string | any = '';
  private _isLoggedIn = false;
  private _userName = '';
  private _firstName = '';
  private _lastName = '';
  private _roles: string[] = [];

  constructor(protected keycloakAngular: KeycloakService) {
    this.Load().then();
  }

  public async Load() {
    this._isLoggedIn = await this.keycloakAngular.isLoggedIn();

    if (this._isLoggedIn) {
      this._roles = this.keycloakAngular.getUserRoles(true);

      const keycloak = this.keycloakAngular.getKeycloakInstance();

      keycloak
      .loadUserInfo()
      .success(userInfo => {
        // @ts-ignore
        this._id = userInfo['sub'];
        // @ts-ignore
        this._userName = userInfo['preferred_username'];
        // @ts-ignore
        this._firstName = userInfo['given_name'];
        // @ts-ignore
        this._lastName = userInfo['family_name'];

        this.onUserChanged.emit();
      })
      .error(() => {
        this.Reset();
      });
    } else {
      this.Reset();
    }
  }

  private Reset() {
    this._id = '';
    this._userName = '';
    this._firstName = '';
    this._lastName = '';
    this._roles = [];

    this._isLoggedIn = false;

    this.onUserChanged.emit();
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public getUserName(): string {
    return this._userName;
  }

  public getFirstName(): string {
    return this._firstName;
  }

  public getLastName(): string
  {
    return this._lastName;
  }

  public getID(): string {
    return this._id;
  }

  public hasRole(role: string): boolean {
    for (const i in this._roles) {
      if (this._roles[i].toUpperCase() === role.toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  public async login() {
    await this.loginRedirect(window.location.href);
  }

  public async loginRedirect(uri: string) {
    await this.keycloakAngular.login({
      redirectUri: uri
    });
    await this.Load();
  }

  public async logout() {
    await this.keycloakAngular.logout(window.location.href);
    await this.Load();
  }
}
