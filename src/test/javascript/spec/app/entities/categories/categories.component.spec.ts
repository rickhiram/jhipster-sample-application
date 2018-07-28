/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jhipster2TestModule } from '../../../test.module';
import { CategoriesComponent } from 'app/entities/categories/categories.component';
import { CategoriesService } from 'app/entities/categories/categories.service';
import { Categories } from 'app/shared/model/categories.model';

describe('Component Tests', () => {
    describe('Categories Management Component', () => {
        let comp: CategoriesComponent;
        let fixture: ComponentFixture<CategoriesComponent>;
        let service: CategoriesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Jhipster2TestModule],
                declarations: [CategoriesComponent],
                providers: []
            })
                .overrideTemplate(CategoriesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Categories(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
