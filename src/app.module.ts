import { Module } from "@nestjs/common";
import { SharedModule } from "./shared/shared.module";

import { UserModule } from "./USERS/user.module";
import { AuthModule } from "./USER_AUTH/auth.module";
import { LandingModule } from "./LANDING/landing.module";
import { SubCategoryModule } from "./SUB_CATEGORY/sub_category.module";
import { ProductsModule } from "./PRODUCTS/products.module";
import { BannerModule } from "./BANNER/banner.module";
import { CategoryModule } from "./CATEGORY/category.module";
import { ProductReviewsModule } from "./PRODUCT_REVIEWS/prod_rev.module";
import { AddressModule } from "./ADDRESS/address.module";
import { WishlistsModule } from "./WISHLIST/wishlist.module";
import { ProductSearchModule } from "./PRODUCT_SEARCH/product_search.module";
import { CartModule } from "./CART/cart.module";
import { MenusModule } from "./MENUS/menus.module";
import { RolesModule } from "./ROLES/roles.module";
import { RolesConfigModule } from "./ROLES_CONFIG/rolesConfig.module";
import { OffersModule } from "./OFFERS/offers.module";
import { SettingsModule } from "./SETTINGS/settings.module";
import { ImgcompressModule } from "./IMAGE_COMPRESS/img_compress.module";
import { StoreModule } from "./STORE/store.module";
import { IndividualSellerModule } from "./INDIVIDUAL_SELLER/individualseller.module";
import { BusinessTypeModule } from "./BUSINESS_TYPE/businesstype.module";
import { OrderModule } from "./ORDER/order.module";
import { ProductImageModule } from "./PRODUCT_IMAGE/productimage.module";
import { ProductVariantModule } from "./PRODUCT_VARIANTS/productvariant.module";
import { StatesModule } from "./STATES/states.module";
import { EnquiryModule } from "./ENQUIRIES/enquiry.module";
import { DeliveryChargeModule } from "./DELIVERY_CHARGE/deliverycharge.module";
import { WeightChargeModule } from "./WEIGHT_CHARGE/weightcharge.module";
import { DistanceChargeModule } from "./DISTANCE_CHARGE/distancecharge.module";
import { LbhChargeModule } from "./LBH_CHARGE/lbhcharge.module";
import { StoreSearchModule } from "./STORE_SEARCH/store_search.module";
import { OrderItemsModule } from "./ORDER_ITEMS/order_items.module";
import { OrderPaymentsModule } from "./ORDER_PAYMENTS/order_payments.module";
import { OrderStatusModule } from "./ORDER_STATUS/order_status.module";
import { TestTableModule } from "./TESTTABLE/testtable.module";
import { UserVerifyModule } from "./USER_VERIFY/userverify.module";
@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    LandingModule,
    BannerModule,
    CategoryModule,
    SubCategoryModule,
    ProductsModule,
    ProductReviewsModule,
    AddressModule,
    WishlistsModule,
    ProductSearchModule,
    CartModule,
    MenusModule,
    RolesModule,
    RolesConfigModule,
    OffersModule,
    SettingsModule,
    StoreModule,
    ImgcompressModule,
    IndividualSellerModule,
    BusinessTypeModule,
    OrderModule,
    ProductImageModule,
    ProductVariantModule,
    StatesModule,
    EnquiryModule,
    DeliveryChargeModule,
    WeightChargeModule,
    DistanceChargeModule,
    LbhChargeModule,
    StoreSearchModule,
    OrderItemsModule,
    OrderPaymentsModule,
    OrderStatusModule,
    TestTableModule,
    UserVerifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
