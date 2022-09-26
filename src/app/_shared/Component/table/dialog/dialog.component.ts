import { Component, ViewChild, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { InputComponent } from '@shared/Component/table/dialog/input/input.component';
import { LabelComponent } from '@shared/Component/table/dialog/label/label.component';
import { SelectComponent } from '@shared/Component/table/dialog/select/select.component';
import { MultiSelectComponent } from '@shared/Component/table/dialog/multiselect/multiselect.component';
import { Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { ColumnEnum } from '@shared/Enum/column.enum';
import { IDialogInputComponent } from '@shared/Component/table/dialog/IDialogInputComponent';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  onChanges: (event) => void;

  ColumnArray: Column[];

  ComponentDictionary: { [key: string]: IDialogInputComponent; } = {};

  DialogData: Dialog;

  confirm: () => void;

  id: string;

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  @ViewChild('content') content: ElementRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  dynamicAddComponent(element: Column) {

    let componentFactory: ComponentFactory<IDialogInputComponent>;

    switch (element.selector) {
      case ColumnEnum.input: {
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(InputComponent);
        break;
      }
      case ColumnEnum.select: {
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
        break;
      }
      case ColumnEnum.multiselect: {
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(MultiSelectComponent);
        break;
      }
      default: {
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(LabelComponent);
        break;
      }
    }

    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const component = componentRef.instance;

    if (this.onChanges) {

      component.onChanges = this.onChanges;

    } else {

      component.onChanges = (): void => {};

    }

    this.ComponentDictionary[element.columnDef] = component;

    component.column = element;

    componentRef.changeDetectorRef.detectChanges();
  }

  getData(): unknown {

    const data = {};

    for (const [key, component] of Object.entries(this.ComponentDictionary)) {

      data[key] = component.column.value;

    }

    return data;

  }

}
