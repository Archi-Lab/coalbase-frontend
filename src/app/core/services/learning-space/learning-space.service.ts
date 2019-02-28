import {Injectable, Injector} from "@angular/core";
import {RestService} from "angular4-hal";
import {BehaviorSubject} from "rxjs";
import {LearningSpace} from "../../../shared/models/learning-space.model";

@Injectable()
export class LearningSpaceService extends RestService<LearningSpace> {

private _learningSpaces: BehaviorSubject<LearningSpace[]> = new BehaviorSubject<LearningSpace[]>([]);

  constructor(injector: Injector) {
    super(LearningSpace, 'learningSpaces', injector);
  }
}
