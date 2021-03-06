import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '@shared/Model/menu.model';
import { MenuService } from '@services/menu/menu.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TableEnum } from '@shared/Enum/table.enum';
import { Read } from '@shared/Ngrx/Actions/maintain.action';
import { entityToArray } from '@shared/Method/object.method';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'Authorize';

  menus: Observable<Menu[]>;

  constructor(private router: Router,
              private swPush: SwPush,
              private store: Store<any>,
              private menuService: MenuService) {

    this.swPush.notificationClicks.subscribe(({action, notification}) => {

      console.log(action);

      console.log(notification);

    });

  }

  ngOnInit() {

    this.store.dispatch( new Read<Menu>(TableEnum.Menus) );

    this.store.select(TableEnum.Menus).subscribe(menus => {
      this.menus = this.menuService.getByAuth(entityToArray(menus));
    });

  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }

}
