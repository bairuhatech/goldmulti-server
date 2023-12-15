"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("STORE", [
      {
        id:2000000,
        password:
          "$2a$10$nt194MVrTzTbF7E7TSz7n.9pHMvXpnvM0pa6VzlClKBMhLGPXbAHS",
        first_name: "admin",
        last_name: "",
        name: "admin",
        email: "admin@123.com",
        code: "+91",
        phone: "1122334455",
        business_location: "Kozhikode",
        business_address: "Roysl Palace",
        business_type: "fancy",
        agreement: "",
        trn_number: "11223344",
        trade_lisc_no: "11223344",
        seller_name: "thomson",
        seller_country: "India",
        birth_country: "India",
        dob: "1997-12-03 07:50:07.385+00",
        id_proof: "",
        id_type: "passport",
        id_issue_country: "India",
        id_expiry_date: "2024-12-03 07:50:07.385+00",
        store_name: "adminstore",
        upscs: "",
        manufacture: "no",
        trn_upload: "",
        logo_upload: "",
        status: "approved",
        status_remark: "",
        createdAt: "2023-12-03 07:50:07.385+00",
        updatedAt: "2023-12-03 07:50:07.385+00",
      },
    ]);
    await queryInterface.bulkInsert("USER", [
      {
        username: "admin@123",
        password:
          "$2a$10$nt194MVrTzTbF7E7TSz7n.9pHMvXpnvM0pa6VzlClKBMhLGPXbAHS",
        first_name: "admin",
        last_name: "",
        name: "admin",
        email: "admin@123.com",
        countrycode: "+91",
        phone: "1234567890",
        image: "",
        type: "admin",
        mail_verify: false,
        phone_verify: false,
        status: true,
        role: "admin",
        store_id: 2000000,
        createdAt: "2023-12-03 07:50:07.385+00",
        updatedAt: "2023-12-03 07:50:07.385+00",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
//npx sequelize-cli db:seed:all  run this command (make sure config.json has db configs)
