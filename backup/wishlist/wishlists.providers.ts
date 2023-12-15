import { Wishlist } from "./wishlists.entity";

export const wishlistsProviders = [
  { provide: "WishlistsRepository", useValue: Wishlist },
];
