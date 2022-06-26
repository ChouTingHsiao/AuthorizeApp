import { Component, OnInit } from '@angular/core';
import { Role } from '@shared/Model/role.model';
import { RoleService } from '@services/role/role.service';
import { Group } from '@shared/Model/group.model';
import { GroupService } from '@services/group/group.service';
import { GroupProgram } from '@shared/Model/groupProgram.model';
import { GroupProgramService } from '@services/groupProgram/groupProgram.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role: Observable<Role>;

  groups: Observable<Group[]>;

  groupPrograms: Observable<GroupProgram[]>;

  constructor(private groupService: GroupService,
              private roleService: RoleService,
              private groupProgramService: GroupProgramService) { }

  ngOnInit() {

    const UserRole: string =  localStorage.getItem('UserRole');

    this.role = this.roleService.getByRoleId(UserRole);

    this.groups = this.groupService.getByAuth();

    const UserGroup: string =  localStorage.getItem('UserGroup');

    this.groupPrograms = this.groupProgramService.getByGroupId(UserGroup);
  }

  SetGroup(group: Group) {

    localStorage.setItem('UserGroup', group.id);
  }
}

