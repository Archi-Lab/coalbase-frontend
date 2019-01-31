import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class AbstractService<T> {
  protected readonly uri: string;
  protected resource: BehaviorSubject<T>;

  constructor(resourceName: string, initialValue: any) {
    this.uri = environment.coalbaseAPI + '/' + resourceName;
    this.resource = new BehaviorSubject<T>(initialValue);
    this.initalizeResource();
  }

  protected abstract initalizeResource(): void;
}

