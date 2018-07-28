import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from 'app/shared/model/categories.model';
import { CategoriesService } from './categories.service';
import { CategoriesComponent } from './categories.component';
import { CategoriesDetailComponent } from './categories-detail.component';
import { CategoriesUpdateComponent } from './categories-update.component';
import { CategoriesDeletePopupComponent } from './categories-delete-dialog.component';
import { ICategories } from 'app/shared/model/categories.model';

@Injectable({ providedIn: 'root' })
export class CategoriesResolve implements Resolve<ICategories> {
    constructor(private service: CategoriesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((categories: HttpResponse<Categories>) => categories.body));
        }
        return of(new Categories());
    }
}

export const categoriesRoute: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster2App.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categories/:id/view',
        component: CategoriesDetailComponent,
        resolve: {
            categories: CategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster2App.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categories/new',
        component: CategoriesUpdateComponent,
        resolve: {
            categories: CategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster2App.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categories/:id/edit',
        component: CategoriesUpdateComponent,
        resolve: {
            categories: CategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster2App.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriesPopupRoute: Routes = [
    {
        path: 'categories/:id/delete',
        component: CategoriesDeletePopupComponent,
        resolve: {
            categories: CategoriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipster2App.categories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
