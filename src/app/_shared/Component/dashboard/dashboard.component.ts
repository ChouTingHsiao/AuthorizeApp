import { Component, OnInit } from '@angular/core';
import { Menu } from '@shared/Model/menu.model';
import { MenuService } from '@services/menu/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Role: string;

  Menus: Observable<Menu[]>;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.Role = localStorage.getItem('Auth');
    this.Menus = this.menuService.getByAuth();
  }

}

