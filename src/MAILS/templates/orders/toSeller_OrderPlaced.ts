const ToSellerOrderPlaced = async (mailObj: any) => {
  let InvoiceDetailsHTML: any = [];
  const moment = require("moment");
  let Rows = mailObj.orderItems.forEach(function (item) {
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
          <div>Sold by: ${mailObj?.storeName}</div>
      </td>
  </tr>`;
  });
  try {
    let formattedDate = moment().format('dddd, MMMM D');
    let obj = {
      to: mailObj.storeEmail,
      subject: `New Order Placed`,
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
                You Have a new order
              </div>
              <div>Order # ${mailObj.orderId}</div>
              <br />
            </div>
      
            <div style="padding: 20px">
              <p style="font-size: 16px">Hello ${mailObj?.storeName},</p>
              <p style="font-size: 13px; color: gray">
                You have a new order. We’ll send a confirmation when your order ships.
                Your estimated delivery date is indicated below. If you would like to
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
                    <div style="font-weight: 900">Placed on ${formattedDate}</div>
                    <div style="font-size: 13px; color: gray">
                      Your shipping speed : Delivery
                    </div>
                    <div style="font-size: 13px; color: gray">
                      Order Status : ${mailObj.status}
                    </div>
                  </td>
                  <td>
                    <div style="font-size: 14px">This order will be sent to:</div>
                    <div style="font-size: 13px; color: gray">
                      ${mailObj.address?.flat}, ${mailObj.address?.street},
                      ${mailObj.address?.city}, ${mailObj.address?.state},
                      ${mailObj.address?.pin_code}
                      <br />
                      Contact Number: ${mailObj.address?.alt_phone}
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
                  <td>₹${mailObj.totalPrice}</td>
                </tr>
                <tr>
                  <td>TAX:</td>
                  <td>₹${mailObj.tax}</td>
                </tr>
                <tr>
                  <td>Delivery Charges:</td>
                  <td>₹${mailObj.deliveryCharge}</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>₹${mailObj.totalPrice}</td>
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
export { ToSellerOrderPlaced };
