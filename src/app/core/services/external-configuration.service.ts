import {Injectable} from '@angular/core';
import {ExternalConfiguration, ExternalConfigurationHandlerInterface} from 'angular4-hal';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

  getProxyUri(): string {
    return environment.coalbaseAPI;
  }

  getRootUri(): string {
    return environment.coalbaseAPI;
  }

  getHttp(): HttpClient {
    return this.http;
  }

  constructor(private http: HttpClient) {
  }

  getExternalConfiguration(): ExternalConfiguration {
    return this;
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
  }

  deserialize(): any {
  }

  serialize(): any {
  }
}
