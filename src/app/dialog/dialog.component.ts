import { Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { DynamicHostDirective } from '../shared/Directive/dynamichost.Directive';
import { InputComponent } from '../shared/Component/input.component';
import { LabelComponent } from '../shared/Component/label.component';
import { Schema } from '../shared/Model/table.model';
import { Dialog } from '../shared/Model/dialog.model';
import { DialogEnum } from '../shared/Enum/dialog.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  SchemaArray: Schema[];

  InputArray: InputComponent[] = [];

  DialogData: Dialog;

  id: string;

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(private componenFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.SchemaArray.forEach(element => {
      this.dynamicAddComponent(element);
    });

  }

  dynamicAddComponent(element: Schema) {

    let componentFactory = this.componenFactoryResolver.resolveComponentFactory(InputComponent);

    if (element.column === DialogEnum.id) {
        componentFactory = this.componenFactoryResolver.resolveComponentFactory(LabelComponent);
    }

    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance = componentRef.instance;

    this.InputArray.push(instance);

    instance.schema = element;

    componentRef.changeDetectorRef.detectChanges();
  }

  confirm() {}

  getData(): any {
    const data = {};

    this.InputArray.forEach(element => {
      data[element.schema.column] = element.schema.value;
    });

    return data;
  }

}
