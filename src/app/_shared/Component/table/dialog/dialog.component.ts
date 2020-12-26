import { Component, ViewChild, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
import { DynamicHostDirective } from '@shared/Directive/dynamichost.Directive';
import { InputComponent } from '@src/app/_shared/Component/table/dialog/input/input.component';
import { LabelComponent } from '@src/app/_shared/Component/table/dialog/label/label.component';
import { SelectComponent } from '@src/app/_shared/Component/table/dialog/select/select.component';
import { MultiSelectComponent } from '@src/app/_shared/Component/table/dialog/multiselect/multiselect.component';
import { Column } from '@shared/Model/table.model';
import { Dialog } from '@shared/Model/dialog.model';
import { ColumnEnum } from '@shared/Enum/column.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  ColumnArray: Column[];

  InputArray: InputComponent[] = [];

  DialogData: Dialog;

  confirm: () => void;

  id: string;

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  @ViewChild('content') content: ElementRef;

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

  getData(): any {
    const data = {};

    this.InputArray.forEach(element => {
      data[element.column.columnDef] = element.column.value;
    });

    return data;
  }

}
