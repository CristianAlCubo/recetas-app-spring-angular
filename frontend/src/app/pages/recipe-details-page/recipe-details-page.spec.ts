import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsPage } from './recipe-details-page';

describe('RecipeDetailsPage', () => {
  let component: RecipeDetailsPage;
  let fixture: ComponentFixture<RecipeDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
