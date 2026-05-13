import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Descubrir } from './descubrir';

describe('DescubrirComponent', () => {
  let component: Descubrir;
  let fixture: ComponentFixture<Descubrir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Descubrir]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Descubrir);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
