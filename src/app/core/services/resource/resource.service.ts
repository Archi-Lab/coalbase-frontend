import {ListResourceService} from "../ListResourceService";
import {Injectable, Injector} from "@angular/core";
import {WebLinkResource} from "../../../shared/models/resource/WebLinkResource";

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends ListResourceService<WebLinkResource> {
  constructor(injector: Injector) {
    super(WebLinkResource, 'webLinkResources', injector);
    this.fetchListResource();
  }

}
