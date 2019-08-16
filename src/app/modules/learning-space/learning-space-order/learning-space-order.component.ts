import {Component, Input} from "@angular/core";
import {LearningSpace} from "../../../shared/models/learning-space/learning-space.model";

@Component({
  selector: 'app-learning-space-order',
  templateUrl: './learning-space-order.component.html',
  styleUrls: ['./learning-space-order.component.scss']
})
export class LearningSpaceOrderComponent{

  @Input() sortedLearningSpaces: LearningSpace[] = [];
  @Input() unsortedLearningSpaces: LearningSpace[] = [];
}
