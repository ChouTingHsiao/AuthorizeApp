import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '@shared/Model/menu.model';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'Authorize';

  menus: Menu[];

  constructor(private router: Router,
              private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getByAuth().subscribe((Menus) => this.menus = Menus);
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }

}
