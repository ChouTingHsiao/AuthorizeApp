import { Component, ViewChild, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { InputComponent } from '@shared/Component/input.component';
import { LabelComponent } from '@shared/Component/label.component';
import { SelectComponent } from '@shared/Component/select.component';
import { MultiSelectComponent } from '@shared/Component/multiselect.component';
import { Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { ColumnEnum } from '@shared/Enum/column.enum';

@Component({
  selector: 'app-dialog',
  template:
  `<h2 mat-dialog-title>{{DialogData.title}}</h2>

   <mat-dialog-content  #content class="mat-typography">
      <ng-container appDynamicHost></ng-container>
   </mat-dialog-content>

   <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close (click)="confirm()">{{DialogData.button[0]}}</button>
    <button mat-button [mat-dialog-close]="true">{{DialogData.button[1]}}</button>
   </mat-dialog-actions>`
})
export class DialogComponent {

  ColumnArray: Column[];

  InputArray: InputComponent[] = [];

  DialogData: Dialog;

  id: string;

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(private componenFactoryResolver: ComponentFactoryResolver) {}

  dynamicAddComponent(element: Column) {

    let componentFactory: ComponentFactory<any>;

    switch (element.selector) {
      case ColumnEnum.input: {
        componentFactory = this.componenFactoryResolver.resolveComponentFactory(InputComponent);
        break;
      }
      case ColumnEnum.select: {
        componentFactory = this.componenFactoryResolver.resolveComponentFactory(SelectComponent);
        break;
      }
      case ColumnEnum.multiselect: {
        componentFactory = this.componenFactoryResolver.resolveComponentFactory(MultiSelectComponent);
        break;
      }
      default: {
        componentFactory = this.componenFactoryResolver.resolveComponentFactory(LabelComponent);
        break;
      }
    }

    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance = componentRef.instance;

    this.InputArray.push(instance);

    instance.column = element;

    componentRef.changeDetectorRef.detectChanges();
  }

  confirm() {}

  getData(): any {
    const data = {};

    this.InputArray.forEach(element => {
      data[element.column.columnDef] = element.column.value;
    });

    return data;
  }

}
