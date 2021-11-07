import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product} from "../../../../core/models/product.model";
import {ProductService} from "../../../../core/services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private sub: Subscription = new Subscription();
  loading = false;
  products: Array<Product> = [];
  totalRecords = 0;
  name: any = null;
  code: any = null;
  public cols: any[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'CODE', width: '140px', sort: true, align: 'left' },
      { field: 'name', header: 'NAME', width: '140px',sort: true, align: 'left' },
      { field: 'description', header: 'DESCRIPTION', width: '140px',sort: true, align: 'left' },
      { field: 'nameBrand', header: 'NAME_BRAND', width: '140px',sort: true, align: 'left' },
      { field: 'valueIva', header: 'VALUE_IVA', width: '140px',sort: true, align: 'right' },
      { field: 'actions', header: 'ACTIONS', width: '140px', align: 'left' },
    ];
    this.getProductsList(this.code, this.name, 1)
  }

  getProductsList(code: string, name: string, company: number): void {
    this.loading = true;
    this.sub.add(this.productService.getProductsFilter(code, name, company).subscribe(data => {
      this.products = data;
      this.totalRecords = data.length;
      console.log(this.products)
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  searchProducts(){
    console.log(this.code)
    console.log(this.name)
    this.getProductsList(this.code, this.name, 1)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
