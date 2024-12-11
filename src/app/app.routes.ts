import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'product/:id', component: ProductDetailComponent, pathMatch: 'full'},
];
