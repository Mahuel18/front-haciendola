import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public product: any
  public token: any;
  public loadBtn: boolean = false;

  constructor(
    private productService : ProductService,
    private authService: AuthServiceService,
    private _router: Router
  ){
    this.token = this.authService.getToken();
    this.product = {};
  }

  register(registerForm:any){
    if(registerForm.valid){
      this.loadBtn = true;

      this.productService.createProduct(this.product).subscribe(
        response =>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#FFF',
            position: 'topRight',
            message: 'Product successfully registered'
          });
          this.loadBtn = false;
          this._router.navigate(['/index'])
        },
        error => {
          console.error('Error creating product:', error);
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            color: '#FFF',
            position: 'topRight',
            message: 'Failed to create product. Please try again later.'
          });
          this.loadBtn = false;
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'The Form Data are not valid'
      });
      this.loadBtn = false;
  }
  }
}
