import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

export abstract class AbstractService<T> {
  public readonly uri: string;
  protected resource: BehaviorSubject<T>;

  constructor(resourceName: string, initialValue: any) {
    this.uri = environment.coalbaseAPI + '/' + resourceName;
    console.log(this.uri);
    this.resource = new BehaviorSubject<T>(initialValue);
    this.initalizeResource();
  }

  protected abstract initalizeResource(): void;

}

