import {Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver, ElementRef} from '@angular/core';
import {DynamicHostDirective} from '@shared/Directive/dynamichost.Directive';
import {InputComponent} from '@shared/Component/input.component';
import {LabelComponent} from '@shared/Component/label.component';
import {Schema} from '@shared/Model/table.model';
import {Dialog} from '@shared/Model/dialog.model';
import {DialogEnum} from '@shared/Enum/dialog.enum';

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
