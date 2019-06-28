import {Component, Input, OnInit} from "@angular/core";
import {ResourceService} from "../../../core/services/resource/resource.service";
import {WebLinkResource} from "../../../shared/models/resource/WebLinkResource";

@Component({
  selector: "app-web-link-view",
  templateUrl: "./web-link-view.component.html",
  styleUrls: ["./web-link-view.component.scss"]
})
export class WebLinkViewComponent implements OnInit{

  @Input() reference: string = "";
  webLinks: WebLinkResource[] = [];
  constructor(private resourceService: ResourceService) {

  }

  ngOnInit(): void {
    let options: any = {params: [{key: "referenceId", value: this.reference}]};
    this.resourceService.search("findByReferenceId", options).subscribe( (webLinks) => {
      this.webLinks = webLinks;
    });
  }
}
