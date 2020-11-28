import { Component, OnInit } from '@angular/core';
import { Program } from '@shared/Model/program.model';
import { Group } from '@shared/Model/group.model';
import { MenuService } from '@services/menu/menu.service';
import { GroupService } from '@services/group/group.service';
import { ProgramService } from '@services/program/program.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Role: string;

  Groups: Observable<Group[]>;

  Programs: Observable<Program[]>;

  constructor(private programService: ProgramService,
              private groupService: GroupService) { }

  ngOnInit() {
    this.Role = localStorage.getItem('Auth');
    this.Groups = this.groupService.getByAuth();
    this.Programs = this.programService.getByAuth();
  }

}

