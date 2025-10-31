import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicListInput } from './dynamic-list-input';

describe('DynamicListInput', () => {
  let component: DynamicListInput;
  let fixture: ComponentFixture<DynamicListInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicListInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicListInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
