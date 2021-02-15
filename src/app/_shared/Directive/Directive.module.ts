import { NgModule  } from '@angular/core';
import { AuthorizeDirective } from '@shared/Directive/authorize.Directive';

@NgModule({
  declarations: [
    AuthorizeDirective,
  ],
  exports: [
    AuthorizeDirective,
  ],
})
export class DirectiveModule { }
