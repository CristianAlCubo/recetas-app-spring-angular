import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title()).toBe('');
    expect(component.icon()).toBeNull();
    expect(component.content()).toBe('');
    expect(component.colorClass()).toBe('primary');
    expect(component.confirmButtonColor()).toBe('primary');
    expect(component.showCancelButton()).toBe(true);
  });

  it('should be hidden by default', () => {
    expect(component.isVisible()).toBe(false);
  });

  it('should show modal when show() is called', () => {
    component.show();
    expect(component.isVisible()).toBe(true);
  });

  it('should hide modal when hide() is called', () => {
    component.isVisible.set(true);
    component.hide();
    expect(component.isVisible()).toBe(false);
  });

  it('should emit onCancel and hide when handleCancel is called', () => {
    spyOn(component.onCancel, 'emit');
    component.isVisible.set(true);
    component.handleCancel();
    expect(component.onCancel.emit).toHaveBeenCalled();
    expect(component.isVisible()).toBe(false);
  });

  it('should emit onConfirm and hide when handleConfirm is called', () => {
    spyOn(component.onConfirm, 'emit');
    component.isVisible.set(true);
    component.handleConfirm();
    expect(component.onConfirm.emit).toHaveBeenCalled();
    expect(component.isVisible()).toBe(false);
  });

  it('should generate correct header class', () => {
    expect(component.getHeaderClass()).toContain('bg-primary');
    expect(component.getHeaderClass()).toContain('text-white');
  });

  it('should generate correct confirm button class', () => {
    expect(component.getConfirmButtonClass()).toContain('btn btn-primary');
  });
});
