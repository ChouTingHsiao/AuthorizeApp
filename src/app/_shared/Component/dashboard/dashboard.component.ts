import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Read } from '@shared/Ngrx/Actions/maintain.action';
import { TableEnum } from '@shared/Enum/table.enum';
import { Menu } from '@shared/Model/menu.model';
import { Role } from '@shared/Model/role.model';
import { RoleService } from '@services/role/role.service';
import { Group } from '@shared/Model/group.model';
import { GroupService } from '@services/group/group.service';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role: Observable<Role>;

  groups: Observable<Group[]>;

  dashBoardGroups: Observable<Group[]>;

  groupPrograms: Observable<GroupProgram[]>;

  constructor(private store: Store,
              private groupService: GroupService,
              private roleService: RoleService,
              private groupProgramService: GroupProgramService) { }

  ngOnInit() {

    const UserRole: string =  localStorage.getItem('UserRole');

    this.role = this.roleService.getByRoleId(UserRole);

    this.groups = this.groupService.getByAuth();

    this.dashBoardGroups = this.groups.pipe(map(x => this.ActiveGroup(x, "")));

    const UserGroup: string =  localStorage.getItem('UserGroup');

    this.groupPrograms = this.groupProgramService.getByGroupId(UserGroup);
  }

  SetGroup(group: Group) {

    localStorage.setItem('UserGroup', group.id);

    this.store.dispatch( new Read<Menu>(TableEnum.Menus) );

    this.dashBoardGroups = this.groups.pipe(map(x => this.ActiveGroup(x, group.id)));
  }

  ActiveGroup(groups: Group[], id: string): Group[] {

    const currentGroup: string = localStorage.getItem('UserGroup');

    this.groupPrograms = this.groupProgramService.getByGroupId(currentGroup);

    groups.forEach(x => {

      x.isActive = false;

      if(x.id === currentGroup){
        x.isActive = true;
      }
    });

    return groups;
  }
}

