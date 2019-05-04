import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';

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
  selectedRam: Number;
  constructor(private BackendApiService: BackendApiService) { }

  ngOnInit() {
    this.currentDate = this.getcurrentDate().requestDt;
    this.defaultEndDt = this.getcurrentDate().defaultEndDt;
    this.getUersList();
    this.getProjectsList();
  }

  reset = function () {
    this.project = {};
    this.Priority = 0;
  }

  addProject = function () {

    var request = {
      'Project': this.project.Project,
      'Start_Date': this.project.startDate == "" ? this.defaultEndDt : this.project.startDate,
      'End_Date': this.project.endDate == "" ? this.currentDate : this.project.endDate,
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
      'Start_Date': this.project.startDate == "" ? this.defaultEndDt : this.project.startDate,
      'End_Date': this.project.endDate == "" ? this.currentDate : this.project.endDate,
      'Priority': this.Priority,
      'Manager': this.project.Manager
    };
    this.BackendApiService.updateProject(request).subscribe((res) => {
      document.getElementById('alert').innerHTML = 'Added Project Successfully!';
      document.getElementById('alert').classList.remove('d-none');
      this.reset();
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
    })
  }

  getUersList = function () {
    this.BackendApiService.getUsersList().subscribe((res) => {
      this.users = res;
      this.usersCopy = res;
    })
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

}
