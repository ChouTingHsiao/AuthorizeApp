import { Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { DynamicHostDirective } from '../shared/Directive/dynamichost.Directive';
import { InputComponent } from '../shared/Component/input.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {

  public DialogData: Dialog = {
    title: '',
    button: [],
    template: '<p>test</p>'
  };

  @ViewChild(DynamicHostDirective, {static: true}) dynamicComponentLoader: DynamicHostDirective;

  constructor(private componenFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
      this.DialogData.title = '維護頁面';
      this.DialogData.button = ['新增', '取消'];
  }

  ngAfterViewInit() {

    const componentFactory = this.componenFactoryResolver.resolveComponentFactory(InputComponent);

    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.changeDetectorRef.detectChanges();
  }

}

export interface Dialog {
  title: string;
  button: string[];
  template: string;
}

