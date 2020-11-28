import { Component, OnInit } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { Group } from '@shared/Model/group.model';
import { MenuService } from '@services/menu/menu.service';
import { GroupService } from '@services/group/group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Role: string;

  Groups: Observable<Group[]>;

  Menus: Observable<Menu[]>;

  constructor(private menuService: MenuService,
              private groupService: GroupService) { }

  ngOnInit() {
    this.Role = localStorage.getItem('Auth');
    this.Groups = this.groupService.getByAuth();
    this.Menus = this.menuService.getByAuth();
  }

}

