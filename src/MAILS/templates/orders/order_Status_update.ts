const OrderUpdateMail = async (
  order: any,
  user: any,
  store: any,
  items: any[],
  address: any
) => {
  let InvoiceDetailsHTML: any = "";
  const moment = require("moment");
  items?.forEach(function (item) {
    InvoiceDetailsHTML += `<tr>
      <td>
          <div>
          <img src="${
            item?.image
          }" alt="logo" class="logo13"  style="width: 50px; height: 50px; object-fit: contain;"/>
          </div>
      </td>
      <td>
          <div>Product Name:${item && item?.name}</div>
          <div>Price: ${item && item?.price} * Quantity: ${
      item && item?.quantity
    }</div>
          <div>Sold by: ${store?.store_name}</div>
      </td>
  </tr>`;
  });
  try {
    let obj = {
      to: user?.email,
      subject: `Your order has been ${order?.status}`,
      template: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="background-color: #f4f4f4">
            <div
              style="
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 10px;
                max-width: 600px;
                background-color: #fff;
                margin: 0 auto;
              "
            >
              <div style="text-align: center">
                <br />
                <div
                  style="
                    border-top: 20px solid #a10244;
                  "
                >
                  <img
                    src="https://bairuha-bucket.s3.ap-south-1.amazonaws.com/nextmiddleeast/logo.95174a95f2415bfa4f0f.png"
                    alt="logo"
                    style="width: 200px; height: 70px; object-fit: contain"
                  />
                </div>
                <br />
                <div style="color: #262941; font-weight: bold; font-size: 20px">
                  Your Order is Updated
                </div>
                <div>OrderID: ${order.id}</div>
                <br />
              </div>
        
              <div style="padding: 20px">
                <p style="font-size: 16px">Hello ${user?.name},</p>
                <p style="font-size: 13px; color: gray">
                  Your order has been ${order.status},
                   If you would like to
                  view the status of your order or make any changes to it, please visit
                  Your Orders on NextME.com.
                </p>
                <br />
                <table
                  style="
                    width: 100%;
                    table-layout: fixed;
                    background-color: rgb(255, 248, 248);
                    border-radius: 10px;
                    padding: 10px;
                  "
                >
                  <tr>
                    <td>
                      <div style="font-weight: 900">Placed on ${moment(
                        order.createdAt
                      ).format("DD/MM/YYYY")}</div>
                      <div style="font-size: 13px; color: gray">
                        Your shipping speed : Delivery
                      </div>
                      <div style="font-size: 13px; color: gray">
                        Order Status : ${order?.status}
                      </div>
                    </td>
                    <td>
                      <div style="font-size: 14px">This order will be sent to:</div>
                      <div style="font-size: 13px; color: gray">
                      ${address?.flat}, ${address?.street},
                      ${address?.city}, ${address?.state},
                      ${address?.pin_code}
                      <br />
                      Contact Number: ${address?.alt_phone}
                    </div>
                    </td>
                  </tr>
                </table>
                <br />
                <p class="txt1">Order summary</p>
                <table>
                  ${InvoiceDetailsHTML}
                </table>
                <hr />
                <table>
                  <tr>
                    <td>Total Product Price:</td>
                    <td>₹${order.total}</td>
                  </tr>
                  <tr>
                    <td>TAX:</td>
                    <td>₹${order.tax}</td>
                  </tr>
                  <tr>
                    <td>Delivery Charges:</td>
                    <td>₹${order.deliveryCharge}</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td>₹${order.total}</td>
                  </tr>
                </table>
                <br />
                <p class="font-size: 11px; color: gray;">
                  This email was sent from a notification-only address that cannot
                  accept incoming email. Please do not reply to this message.
                </p>
              </div>
              <div
                style="
                  background-color: #a10244;
                  height: auto;
                  margin: 0 auto;
                  padding: 10px 40px;
                  text-align: justify;
                  color: white;
                  font-size: x-small;
                "
              >
                <h2 style="text-align: center; color: white">
                  <span style="text-decoration: none; color: inherit">
                    <a
                      href="https://www.nextmiddleeast.com/"
                      style="text-decoration: none; color: inherit"
                      >Next ME</a
                    >
                  </span>
                </h2>
                <p>
                  Founded in 2023 by a group of businessmen in UAE, NextMe leverages the
                  power of marketing intelligence and e-commerce vision to deliver a
                  wide range of products that make your lifestyle more attractive.
                </p>
              </div>
            </div>
          </body>
        </html>
          `,
    };
    return obj;
  } catch (err) {
    let obj = {};
    return obj;
  }
};
export { OrderUpdateMail };
