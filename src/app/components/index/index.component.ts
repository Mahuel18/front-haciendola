import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  public loadData = true;
  public token = localStorage.getItem('token');
  public url = GLOBAL.url;
  public loadBtn = false;
  public products: Product[] = [];

  constructor(private productService: ProductService){ 
   }

  ngOnInit(): void{
    this.getAllProducts();
  }

  getAllProducts(){
    this.loadData = true;
    this.productService.getAllProducts().subscribe(
      (data)=>{
        this.products = data;
        this.loadData = false;
      },
      (error) => {
        console.error('Error getting products:', error);
      }
    )
  }



  deleteProduct(id:any){
    this.productService.deleteProduct(id).subscribe(
      (response)=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Product Deleted Successfully'
        });
        window.location.reload();
      },
      (error)=>{
        iziToast.show({
          title: 'FAILED',
          titleColor: '#ff0000',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'There was a problem in the server'
        });
      }
    )
  }

}
