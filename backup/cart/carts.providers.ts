import { Cart } from './cart.entity';

export const cartsProviders = [{ provide: 'CartsRepository', useValue: Cart }];
