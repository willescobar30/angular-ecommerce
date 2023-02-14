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
  
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //suscrbiendo la lista de Productos a las rutas
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })  
  }

  listProducts() {
    //validando si "id" esta disponible
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //obteniendo el "id" en string. convirtiendo el strin a un numero usando el simbolo "+"
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
