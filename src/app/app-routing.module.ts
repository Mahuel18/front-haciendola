import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { IndexComponent } from "./components/index/index.component";
import { AuthGuard } from "./guards/auth.guard";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditProductComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }