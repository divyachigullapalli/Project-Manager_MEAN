import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
import { of } from 'rxjs'
import { BackendApiService } from './backend-api.service';

describe('BackendApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule]
  }));
  let httpSpy: { get: jasmine.Spy };
  let service: BackendApiService;
  beforeEach(() => {
    // TODO: spy on other methods too
    httpSpy = jasmine.createSpyObj('Http', ['get', 'post','put','delete']);
    service = TestBed.get(BackendApiService);
  });

  it('should be created', () => {
    // const service: BackendApiService = TestBed.get(BackendApiService);
    expect(service).toBeTruthy();
  });

  it('setData', () => {
    let data = {
      'Task': 'Parent Task'
    };
    service.setData(data);
    var getData = service.getData();
    expect(getData).toEqual(data);
  });

  // it('should getUsersList', () => {
  //   const expectedUsers = [{ id: 1, First_Name: 'A' }, { id: 2, First_Name: 'B' }];

  //   httpSpy.get.and.returnValue(of(expectedUsers));

  //   service.getUsersList().subscribe(users => {
  //     expect(users).toEqual(expectedUsers, 'expected')
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });

  // it('should addUser', () => {
  //   const user = { id: 1, First_Name: 'A' };

  //   httpSpy.get.and.returnValue(of({ 'success': true }));

  //   service.addUser(user).subscribe(res => {
  //     expect(res).toEqual({ 'success': true })
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });

  // it('should updateUser', () => {
  //   const user = { id: 1, First_Name: 'A' };

  //   httpSpy.get.and.returnValue(of({ 'success': true }));

  //   service.updateUser(user).subscribe(res => {
  //     expect(res).toEqual({ 'success': true })
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });

  // it('should deleteUser', () => {
  //   const id = 12123;

  //   httpSpy.get.and.returnValue(of({ 'success': true }));

  //   service.deleteUser(id).subscribe(res => {
  //     expect(res).toEqual({ 'success': true })
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });


  // it('should addProject', () => {
  //   const proj = {};

  //   httpSpy.get.and.returnValue(of(proj));

  //   service.addProject(proj).subscribe(users => {
  //     expect(users).toEqual(proj)
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });

  // it('should getProjectsList', () => {
  //   httpSpy.get.and.returnValue(of({ 'success': true }));

  //   service.getProjectsList().subscribe(res => {
  //     expect(res).toEqual({ 'success': true })
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });

  // it('should updateProject', () => {
  //   const proj = {};

  //   httpSpy.get.and.returnValue(of({ 'success': true }));

  //   service.updateProject(proj).subscribe(res => {
  //     expect(res).toEqual({ 'success': true })
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });

  // it('should deleteProject', () => {
  //   const id = 12123;

  //   httpSpy.get.and.returnValue(of({ 'success': true }));

  //   service.deleteProject(id).subscribe(res => {
  //     expect(res).toEqual({ 'success': true })
  //   });
  //   expect(httpSpy.get.calls.count()).toBe(0);
  // });


});
