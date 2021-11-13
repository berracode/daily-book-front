import {ProviderProductDto} from "./provider-product.dto";

export class ProductDetailDto {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  brandId?: number;
  ivaId?: number;
  companyId?: number;
  productDetail?: ProviderProductDto;
}
