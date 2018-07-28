import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategories } from 'app/shared/model/categories.model';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'jhi-categories-update',
    templateUrl: './categories-update.component.html'
})
export class CategoriesUpdateComponent implements OnInit {
    private _categories: ICategories;
    isSaving: boolean;

    constructor(private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categories }) => {
            this.categories = categories;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categories.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriesService.update(this.categories));
        } else {
            this.subscribeToSaveResponse(this.categoriesService.create(this.categories));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategories>>) {
        result.subscribe((res: HttpResponse<ICategories>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get categories() {
        return this._categories;
    }

    set categories(categories: ICategories) {
        this._categories = categories;
    }
}
