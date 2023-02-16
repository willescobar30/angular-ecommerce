import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 0;
  searchMode: boolean = false;
  
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //suscrbiendo la lista de Productos a las rutas
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })  
  }

  listProducts() {
    //keyword pasado a traves de SearchComponent
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    //si searchMode es true, que busque por keyword
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      //sino que busque por categoria
      this.handleListProducts();
    }
    
  }

  //funcion para buscar por Keyword
  handleSearchProducts() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    //llamando a la funcion de Service para buscar productos por keyword
    this.productService.searchProducts(theKeyWord).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){
    //validando si "id" esta disponible
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //obteniendo el "id" en string. convirtiendo el string a un numero usando el simbolo "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      //no hay id existente.. por defeccto ira a categoria 1
      this.currentCategoryId = 1;
    }

    //obeteniendo los productos de la categoria enviada
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
