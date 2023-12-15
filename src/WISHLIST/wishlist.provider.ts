import { Wishlist } from "./wishlist.entity";

export const wishlistsProviders = [
	{ provide: "WishlistRepository", useValue: Wishlist },
];
