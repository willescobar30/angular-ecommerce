/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  //inicializando arreglo de la clase ProducCategory
  productCategories: ProductCategory[] = [];
  //inyentando ProductService
  constructor(private productService: ProductService) { }

  ngOnInit() {
    //llamando funcion
    this.listProductCategories();
  }

  listProductCategories() {
    //a traves del objeto productservice llamamos la funcion getProductCategories
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        //asignando informacion del servicio al arreglo productCategories
        this.productCategories = data;
      }
    );
  }

}
