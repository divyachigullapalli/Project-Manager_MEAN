import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BackendApiService } from '../../services/backend-api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipe} from '../../pipes/filter.pipe';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let backendApiService: BackendApiService;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent, FilterPipe],
      imports:[FormsModule,HttpModule],
      providers: [BackendApiService, FilterPipe,OrderModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendApiService = TestBed.get(BackendApiService);
  });

  it('should create component', () => {
   // expect(component).toBeTruthy();
  });

  it('should reset user', () => {
    component.reset();
    //expect(component.user).toEqual('');
  });

  it('should getUersList user', () => {
    component.getUersList();
    // spyOn(backendApiService,'getUsersList');
   //  expect(backendApiService.getUsersList()).toHaveBeenCalled();
  });
});
