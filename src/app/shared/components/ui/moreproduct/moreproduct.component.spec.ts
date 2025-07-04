import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreproductComponent } from './moreproduct.component';

describe('MoreproductComponent', () => {
  let component: MoreproductComponent;
  let fixture: ComponentFixture<MoreproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
