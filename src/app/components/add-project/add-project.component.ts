import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project = {
    'Project': '',
    'Priority': 0,
    'startDate': '',
    'endDate': '',
    'Manager': '',
    'edit': false
  };
  currentDate: string;
  defaultEndDt: string;
  projects: Object[];
  projectsCopy: Object[];
  Priority: Number;
  constructor(private BackendApiService: BackendApiService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.currentDate = this.getcurrentDate().requestDt;
    this.defaultEndDt = this.getcurrentDate().defaultEndDt;
    this.Priority = 0;
    this.getUersList();
    this.getProjectsList();
  }

  reset = function () {
    document.getElementById('reset').click();
    this.Priority = 0;
  }

  assignDefault = function () {
    if (this.project.checked) {
      this.project.startDate = this.currentDate;
      this.project.endDate = this.defaultEndDt;
    } else {
      this.project.startDate = '';
      this.project.endDate = '';
    }
  }


  addProject = function () {
    var request = {
      'Project': this.project.Project,
      'Start_Date': this.project.startDate,
      'End_Date': this.project.endDate,
      'Priority': this.Priority,
      'Manager': this.project.Manager
    };
    this.BackendApiService.addProject(request).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Added Project Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.reset();
      this.getProjectsList();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);

  }

  EditProject = function (proj) {
    this.project = {
      'edit': true
    };
    this.project._id = proj._id;
    this.Priority = proj.Priority;
    this.project.Project = proj.Project;
    this.project.startDate = proj.Start_Date;
    this.project.endDate = proj.End_Date;
    this.project.Manager = proj.Manager;
  }

  updateProject = function () {
    var request = {
      '_id': this.project._id,
      'Project': this.project.Project,
      'Start_Date': this.project.startDate,
      'End_Date': this.project.endDate,
      'Priority': this.Priority,
      'Manager': this.project.Manager
    };
    this.BackendApiService.updateProject(request).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Updated Project Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.reset();
      this.project.edit = false;
      this.getProjectsList();
    });
    setTimeout(function () {
      document.getElementById('alert').classList.add('d-none');
    }, 5000);

  }

  getProjectsList = function () {
    this.BackendApiService.getProjectsList().subscribe((res) => {
      this.projects = res;
      this.projectsCopy = res;
      this.getTasksList();
    })
  }

  getUersList = function () {
    this.BackendApiService.getUsersList().subscribe((res) => {
      this.users = res;
      this.usersCopy = res;
    })
  }

  getTasksList = function () {
    this.projects.forEach(element => {
      let count = 0;
      let id = element._id;
      element.NumOfTasksComp = count;
      this.BackendApiService.getTasksList(id).subscribe((res) => {
        this.tasks = res;
        element.NumOfTasks = res.length;
        res.forEach(task => {
          (task.Status == true) ? count++ : count;
          element.NumOfTasksComp = count;
        });
      })
    });
  }

  getcurrentDate = function () {
    let currentDate = new Date();
    let date = "" + currentDate.getDate();
    if (+date < 10) { date = "0" + date }
    var nextdate = +date + 1
    var month = "" + (currentDate.getMonth() + 1);
    if (+month < 10) { month = "0" + month }
    var year = currentDate.getFullYear();
    var requestDt = year + "-" + month + "-" + date;
    var defaultEndDt = year + "-" + month + "-" + (nextdate < 10 ? "0" + nextdate : nextdate)
    return {
      requestDt: requestDt,
      defaultEndDt: defaultEndDt
    };
  }

  selectManager = function (user) {
    this.project.Manager = user.First_Name + " " + user.Last_Name;
    this.searchManager = '';
  }

  filterProjects = function (searchby) {
    if (searchby) {
      this.projects = this.orderPipe.transform(this.projectsCopy, searchby)
    }
  }

  checkDateErr = function (startDate, endDate) {
    this.errMessage = '';
    if (Date.parse(startDate) >= Date.parse(endDate)) {
      this.errMessage = 'End Date should be greater than start date';
      this.project.endDate = '';
      return false;
    }
  }

}
