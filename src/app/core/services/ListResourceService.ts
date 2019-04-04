import {Resource, RestService} from 'angular4-hal';
import {BehaviorSubject, from, Observable} from 'rxjs';

export abstract class ListResourceService<T extends Resource> extends RestService<T> {
  private readonly _listResource: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public getFirstElement(): Observable<T> {
    return from(new Promise(resolve => {
      this.getAll().subscribe(value => {
        resolve(value[0]);
      }, error => Promise.reject(error));
    }));
  }

  delete(entity: T): Observable<Object> {
    this.deleteResourceFromState(entity);
    return super.delete(entity);
  }

  create(entity: T): Observable<Observable<never> | T> {
    return from(new Promise(resolve => {
      super.create(entity).subscribe(resource => {
        this.createResourceInState(resource as T);
        resolve(resource);
      });
    }));
  }

  update(entity: T): Observable<Observable<never> | T> {
    this.updateResourceInState(entity);
    return super.update(entity);
  }

  patch(entity: T): Observable<Observable<never> | T> {
    this.updateResourceInState(entity);
    return super.patch(entity);
  }

  public get listResource(): Observable<T[]> {
    return this._listResource.asObservable();
  }

  protected fetchListResource(): void {
    super.getAll().subscribe(listResource => {
      this._listResource.next(listResource);
    });
  }

  private deleteResourceFromState(resource: T): void {
    let state: T[] = this._listResource.value;
    state = state.filter(stateResource => this.getResourceIdFromResource(stateResource) !== this.getResourceIdFromResource(resource));
    this._listResource.next(state);
  }

  private getResourceIdFromResource(resource: T): string {
    if (resource._links != null && resource._links.hasOwnProperty('self')) {
      const selfUri: string = resource._links.self.href;
      return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
    } else {
      return '';
    }
  }

  private updateResourceInState(resource: T): void {
    const state: T[] = this._listResource.value;
    state.forEach((stateResource, index) => {
      if (this.getResourceIdFromResource(stateResource) === this.getResourceIdFromResource(resource)) {
        state[index] = resource;
      }
    });
    this._listResource.next(state);
  }

  private createResourceInState(resource: T): void {
    const state: T[] = this._listResource.value;
    state.push(resource);
    this._listResource.next(state);
  }
}
