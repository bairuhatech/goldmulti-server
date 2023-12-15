import { Product_view } from './product_view.entity';

export const product_viewsProviders = [{ provide: 'Product_viewsRepository', useValue: Product_view }];
