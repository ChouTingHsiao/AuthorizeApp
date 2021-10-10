import { Directive, OnInit, AfterViewChecked, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router  } from '@angular/router';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';

@Directive({
  selector: '[appAuthorize]'
})
export class AuthorizeDirective implements OnInit, AfterViewChecked {

  AuthorizeDictionary: { [key: string]: any; } = {};

  constructor(private router: Router,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private groupProgramService: GroupProgramService) { }

  ngOnInit() {

    this.viewContainer.createEmbeddedView(this.templateRef);

    const linkName =  this.router.url.split('/')[2];

    this.groupProgramService.getByLink(linkName).subscribe(buttons => {

      buttons.forEach(x => {

        this.AuthorizeDictionary[x.name] = x.isEnable;

      });

    });

  }

  ngAfterViewChecked() {

    for (const [key, isEnable] of Object.entries(this.AuthorizeDictionary)) {

      if (!isEnable) {

        const elements: HTMLButtonElement[] = this.templateRef
                                                  .elementRef
                                                  .nativeElement
                                                  .ownerDocument
                                                  .querySelectorAll(`button#${key}:not([disabled])`);

        elements.forEach( element => {

          element.disabled = true;

          element.style.cssText  = 'background-color : gray; color : white;';

        });

      }

    }


  }

}
