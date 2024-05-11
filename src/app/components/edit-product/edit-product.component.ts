import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast: any;
declare var $:any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  public product : any = {};
  public loadBtn = false;
  public id: any;
  public token: any;
  public url: any;

  constructor(
    private _route : ActivatedRoute,
    private _productService : ProductService,
    private _router : Router
  ){
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void{
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._productService.getProductById(this.id).subscribe(
          response => {
            var data:any = {}
            data.id = response.id,
            data.handle = response.handle,
            data.title = response.title,
            data.description = response.description,
            data.sku = response.sku,
            data.grams = response.grams,
            data.stock = response.stock,
            data.price = response.price,
            data.comparePrice = response.comparePrice,
            data.barcode = response.barcode

            if(response.id == undefined){
              this.product = undefined
            } else {
              this.product = data;
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  update(updateForm: any){
    if(updateForm.valid){
      var data: any = {};
            data.id = this.product.id,
            data.handle = this.product.handle,
            data.title = this.product.title,
            data.description = this.product.description,
            data.sku = this.product.sku,
            data.grams = this.product.grams,
            data.stock = this.product.stock,
            data.price = this.product.price,
            data.comparePrice = this.product.comparePrice,
            data.barcode = this.product.barcode
      
      this.loadBtn = true;
      this._productService.updateProduct(this.id, data).subscribe(
        response =>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            color: '#FFF',
            position: 'topRight',
            message: 'Product successfully updated'
          });
          this.loadBtn = false;
          this._router.navigate(['/index']);
        },
        error => {
          console.log(error)
          this.loadBtn = false;
        }
      )
    } else {
      this.loadBtn = false;
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        color: '#FFF',
        position: 'topRight',
        message: 'The Form Data are not valid'
      });
    }
  }
}
