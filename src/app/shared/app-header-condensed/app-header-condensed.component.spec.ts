import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppHeaderCondensedComponent } from './app-header-condensed.component';

describe('AppHeaderCondensedComponent', () => {
  let component: AppHeaderCondensedComponent;
  let fixture: ComponentFixture<AppHeaderCondensedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHeaderCondensedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderCondensedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
