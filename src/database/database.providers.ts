import { Sequelize } from "sequelize-typescript";
import { User } from "./../USERS/user.entity";
import { ConfigService } from "./../shared/config/config.service";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { Products } from "../PRODUCTS/products.entity";
import { Banner } from "../BANNER/banner.entity";
import { Category } from "../CATEGORY/category.entity";
import { ProductReviews } from "../PRODUCT_REVIEWS/prod_rev.entity";
import { Address } from "../ADDRESS/address.entity";
import { Wishlist } from "../WISHLIST/wishlist.entity";
import { CartTable } from "../CART/cart.entity";
import { Menus } from "../MENUS/menus.entity";
import { Roles } from "../ROLES/roles.entity";
import { RolesConfig } from "../ROLES_CONFIG/rolesConfig.entity";
import { Offers } from "../OFFERS/offers.entity";
import { Settings } from "../SETTINGS/settings.entity";
import { Store } from "../STORE/store.entity";
import { IndividualSeller } from "../INDIVIDUAL_SELLER/individualseller.entity";
import { BusinessType } from "../BUSINESS_TYPE/businesstype.entity";
import { Order } from "../ORDER/order.entity";
import { ProductImage } from "../PRODUCT_IMAGE/productimage.entity";
import { ProductVariant } from "../PRODUCT_VARIANTS/productvariant.entity";
import { States } from "../STATES/states.entity";
import { Enquiry } from "../ENQUIRIES/enquiry.entity";
import { DeliveryCharge } from "../DELIVERY_CHARGE/deliverycharge.entity";
import { WeightCharge } from "../WEIGHT_CHARGE/weightcharge.entity";
import { DistanceCharge } from "../DISTANCE_CHARGE/distancecharge.entity";
import { LbhCharge } from "../LBH_CHARGE/lbhcharge.entity";
import { OrderItems } from "../ORDER_ITEMS/order_items.entity";
import { OrderPayments } from "../ORDER_PAYMENTS/order_payments.entity";
import { OrderStatus } from "../ORDER_STATUS/order_status.entity";
import { TestTable } from "../TESTTABLE/testtable.entity";
import { UserVerify } from "../USER_VERIFY/userverify.entity";
export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([
        User,
        Banner,
        Category,
        SubCategory,
        Products,
        ProductReviews,
        Address,
        Wishlist,
        CartTable,
        Menus,
        Roles,
        RolesConfig,
        Offers,
        Settings,
        Store,
        IndividualSeller,
        BusinessType,
        Order,
        ProductImage,
        ProductVariant,
        States,
        Enquiry,
        DeliveryCharge,
        WeightCharge,
        DistanceCharge,
        LbhCharge,
        OrderItems,
        OrderPayments,
        OrderStatus,
        TestTable,
        UserVerify
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
