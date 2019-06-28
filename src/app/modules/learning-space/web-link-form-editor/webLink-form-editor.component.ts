import {Component, Input, OnChanges, OnInit, SimpleChange} from "@angular/core";
import {WebLinkResource} from "../../../shared/models/resource/WebLinkResource";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../../../core/services/resource/resource.service";

@Component({
  selector: "app-learning-space-webLink-editor",
  templateUrl: "./webLink-form-editor.component.html",
  styleUrls: ["./webLink-form-editor.component.scss"]
})
export class WebLinkFormEditorComponent implements OnChanges {

  @Input() webLinkReference: string = "";
  reference: string = "";
  webLinkFormGroup: FormGroup = new FormGroup({
    webLinks: new FormArray([])
  });


  constructor(private readonly resourceService: ResourceService) {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if (changes.webLinkReference && changes.webLinkReference.currentValue) {
      this.reference = this.cutFirstUrlPart(this.webLinkReference);
      if (this.reference) {
        let options: any = {params: [{key: "referenceId", value: this.reference}]};
        this.resourceService.search("findByReferenceId", options).subscribe(webLinks => {
          webLinks.forEach(webLink => {
            this.addWebLinkResource(webLink.webLink, webLink.description, webLink);
          });
        });
      } else {
        this.addWebLinkResource("", "");
      }
    }
  }

  public addWebLinkResource(webLink: string, description: string, webLinkResource?: WebLinkResource): void {
    const formGroup: FormGroup = new FormGroup({
      webLink: new FormControl(webLink, Validators.required),
      description: new FormControl(description),
      object: new FormControl(webLinkResource)
    });
    this.webLinks.push(formGroup);
  }

  public removeWebLinkResource(index: number): void {

    const formGroup = this.webLinks.controls[index] as FormGroup;
    const webLink = formGroup.get("object") as FormControl;
    if (webLink && webLink.value) {
      this.resourceService.delete(webLink.value).subscribe();
    }
    this.webLinks.removeAt(index);
  }

  public saveWebLinkResources() {
    const webLinkResources: WebLinkResource[] = [];

    if (this.reference) {
      this.webLinks.controls.forEach(webLinksForm => {
          const webLinkObject = webLinksForm.get("object") as FormControl;
          const webLink = webLinksForm.get("webLink") as FormControl;
          const description = webLinksForm.get("description") as FormControl;

          if (webLinkObject.value) {
            const webLinkResource: WebLinkResource = webLinkObject.value;
            webLinkResource.description = description.value;
            webLinkResource.webLink = webLink.value;
            webLinkResource.referenceId = this.reference;
            webLinkResources.push(webLinkResource);
          } else {
            webLinkResources.push(new WebLinkResource(this.reference, webLink.value, description.value));
          }
        }
      );

      webLinkResources.forEach(webLinkResource => {
        if (webLinkResource._links && webLinkResource._links.self) {
          this.resourceService.update(webLinkResource).subscribe();
        } else {
          this.resourceService.create(webLinkResource).subscribe();
        }
      })
    } else {
      throw new Error("No reference is set for these webLinks");
    }
  }

  public get webLinks(): FormArray {
    return this.webLinkFormGroup.get("webLinks") as FormArray;
  }

  private cutFirstUrlPart(reference: string): string {
    const firstCut: string = reference.substring((reference.indexOf("//") + 2));
    return firstCut.substring((firstCut.indexOf("/") + 1));
  }

}
