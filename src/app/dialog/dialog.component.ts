import { Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { DynamicHostDirective } from '../shared/Directive/dynamichost.Directive';
import { InputComponent } from '../shared/Component/input.component';
import {Schema} from '../shared/Model/table.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  SchemaArray: Schema[];

  InputArray: InputComponent[] = [];

  public DialogData: Dialog = {
    title: '',
    button: [],
    template: '<p>test</p>'
  };

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(private componenFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
      this.DialogData.title = '維護頁面';
      this.DialogData.button = ['新增', '取消'];
  }

  ngAfterViewInit() {

    this.SchemaArray.forEach(element => {
      this.dynamicAddComponent(element);
    });

  }

  dynamicAddComponent(element: Schema) {

    console.log(element);

    const componentFactory = this.componenFactoryResolver.resolveComponentFactory(InputComponent);

    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;

    // viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance = componentRef.instance;

    this.InputArray.push(instance);

    instance.placeholdertext = element.column;

    instance.valuetext = element.value;

    componentRef.changeDetectorRef.detectChanges();
  }

  confirm() {
    this.InputArray.forEach(element => {
      console.log(`${element.placeholdertext}:${element.valuetext}`);
    });
  }

}

export interface Dialog {
  title: string;
  button: string[];
  template: string;
}

