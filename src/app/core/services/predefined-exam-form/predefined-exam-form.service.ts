import {Injectable, Injector} from '@angular/core';
import {ListResourceService} from "../ListResourceService";
import {PredefinedExamForm} from "../../../shared/models/predefined-exam-form/predefined-exam-form.model";

@Injectable({
  providedIn: 'root'
})
export class PredefinedExamFormService extends ListResourceService<PredefinedExamForm> {

  constructor(injector: Injector) {
    super(PredefinedExamForm, 'predefinedExamForms', injector);
    this.fetchListResource();
  }
}
