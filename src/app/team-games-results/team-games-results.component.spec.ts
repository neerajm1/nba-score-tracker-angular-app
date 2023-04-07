import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGamesResultsComponent } from './team-games-results.component';

describe('TeamGamesResultsComponent', () => {
  let component: TeamGamesResultsComponent;
  let fixture: ComponentFixture<TeamGamesResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamGamesResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamGamesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
