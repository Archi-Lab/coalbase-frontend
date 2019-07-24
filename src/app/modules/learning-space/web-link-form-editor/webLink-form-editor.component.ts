import {Component, Input, OnChanges, SimpleChange} from "@angular/core";
import {WebLinkResource} from "../../../shared/models/resource/WebLinkResource";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceService} from "../../../core/services/resource/resource.service";

@Component({
  selector: "app-learning-space-webLink-editor",
  templateUrl: "./webLink-form-editor.component.html",
  styleUrls: ["./webLink-form-editor.component.scss"]
})
export class WebLinkFormEditorComponent implements OnChanges {

  @Input() reference: string | undefined;
  webLinkFormGroup: FormGroup = new FormGroup({
    webLinks: new FormArray([])
  });


  constructor(private readonly resourceService: ResourceService) {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    this.initializeForm(changes.reference);
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

  public saveWebLinkResources(resourceReference: string) {
    const webLinkResources: WebLinkResource[] = [];

    if (resourceReference) {
      this.webLinks.controls.forEach(webLinksForm => {
          const webLinkObject = webLinksForm.get("object") as FormControl;
          const webLink = webLinksForm.get("webLink") as FormControl;
          const description = webLinksForm.get("description") as FormControl;
          if (!this.isWebLinkEmpty(webLink.value, description.value)) {
            if (webLinkObject.value) {
              const webLinkResource: WebLinkResource = webLinkObject.value;
              webLinkResource.description = description.value;
              webLinkResource.webLink = webLink.value;
              webLinkResource.referenceId = resourceReference;
              webLinkResources.push(webLinkResource);
            } else {
              webLinkResources.push(new WebLinkResource(resourceReference, webLink.value, description.value));
            }
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
    }
  }

  public get webLinks(): FormArray {
    return this.webLinkFormGroup.get("webLinks") as FormArray;
  }

  private isWebLinkEmpty(webLink: string, description: string): boolean {
    return webLink === "" && description === "";
  }

  private initializeForm(referenceChange: SimpleChange) {
    if (referenceChange && this.reference) {
      let options: any = {params: [{key: "referenceId", value: this.reference}]};
      this.resourceService.search("findByReferenceId", options).subscribe(webLinks => {
        if (webLinks && webLinks.length > 0) {
          webLinks.forEach(webLink => {
            this.addWebLinkResource(webLink.webLink, webLink.description, webLink);
          });
        } else if (this.webLinks.controls.length === 0) {
          this.addWebLinkResource("", "");
        }
      });
    }
  }
}
