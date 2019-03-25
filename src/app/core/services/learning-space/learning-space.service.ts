import {Injectable, Injector} from '@angular/core';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {ListResourceService} from '../ListResourceService';

@Injectable()
export class LearningSpaceService extends ListResourceService<LearningSpace> {
  constructor(injector: Injector) {
    super(LearningSpace, 'learningSpaces', injector);
    this.fetchListResource();
  }


}
