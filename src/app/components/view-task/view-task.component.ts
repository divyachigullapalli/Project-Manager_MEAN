import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  task = {};
  tasks: Object[];
  projects: Object[];
  parentTasksCopy: Object[];
  constructor(private BackendApiService: BackendApiService, private router: Router) { }

  ngOnInit() {
    this.getProjectsList();
    this.getParentTasksList();
  }

  getProjectsList = function () {
    this.BackendApiService.getProjectsList().subscribe((res) => {
      this.projects = res;
      this.projectsCopy = res;
    })
  }
  getParentTasksList = function () {
    this.BackendApiService.getParentTasksList().subscribe((ptasks) => {
      this.parentTasks = ptasks;
      this.parentTasksCopy = ptasks;
    });
  }

  getParentByFilter = function (id) {
    let parent = this.parentTasksCopy.find(x => x._id === id);
    return parent.Parent_Task;
  }

  getTasksList = function (id) {
    this.BackendApiService.getTasksList(id).subscribe((res) => {
      this.tasks = res;
    })
  }

  selectProject = function (proj) {
    this.Project_ID = proj._id;
    this.Project = proj.Project;
    this.searchProject = '';
    this.getTasksList(this.Project_ID);
  }

  EndTask = function(id){
    var request={
      '_id':id,
      'Status': true
    };
    this.BackendApiService.updateTask(request).subscribe((res) => {
    })
  }

  EditTask = function(task){
    task.edit=true;
    this.BackendApiService.setData(task);
    this.router.navigate(['addtask']);
  }

}
