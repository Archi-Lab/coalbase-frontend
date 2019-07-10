import {Injectable, Injector} from '@angular/core';
import {RestService} from "angular4-hal";
import {Observable} from "rxjs";
import {Comment} from "../../../shared/models/comment/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends RestService<Comment> {

  constructor(injector: Injector) {
    super(Comment, 'comments', injector);
  }

  findByAttachedEntityIdAndAttributeName(attachedEntityId: string, attributeName: string): Observable<Comment[]> {
    let options: any = {params: [{key: 'attachedEntityId', value: attachedEntityId}, {key: 'attributeName', value: attributeName}]};
    return this.search('findByAttachedEntityIdAndAttributeName', options);
  }
}
