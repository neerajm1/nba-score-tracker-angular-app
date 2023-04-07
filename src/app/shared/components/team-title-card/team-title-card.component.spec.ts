import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTitleCardComponent } from './team-title-card.component';

describe('TeamTitleCardComponent', () => {
  let component: TeamTitleCardComponent;
  let fixture: ComponentFixture<TeamTitleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTitleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
