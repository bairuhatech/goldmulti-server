const ToUserOrderPlaced = async (mailObj: any) => {
  const moment = require("moment");
  try {
    let formattedDate = moment().format('dddd, MMMM D');
    let obj = {
      to: mailObj.userEmail,
      subject: `Your NextME Order Placed`,
      template: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
      
        <body
          style="
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px 0;
            "
          >
            <table
              style="
                text-align: left;
                margin-bottom: 20px;
                border-top: #a10244 20px solid;
              "
            >
              <tr>
                <td style="width: 20%">
                  <img
                    src="https://bairuha-bucket.s3.ap-south-1.amazonaws.com/nextmiddleeast/logo.95174a95f2415bfa4f0f.png"
                    alt="Company Logo"
                    style="
                      max-width: 100%;
                      height: auto;
                      display: inline-block;
                      vertical-align: middle;
                    "
                  />
                </td>
                <td style="">
                  <div style="text-align: right; font-size: small">
                    Order Confirmation<br />
                    Order # ${mailObj?.orderId}
                  </div>
                </td>
              </tr>
            </table>
      
            <div style="text-align: justify; padding: 0 30px">
              <p>Hello ${mailObj.userName},</p>
              <p>
                Thank you for shopping with us. We'd like to let you know that ${
                mailObj.storeName } has received your order and is preparing it for
                shipment. Your estimated delivery date is indicated below. If you
                would like to view the status of your order or make any changes to it,
                please visit Your Orders on NextMe.in.
              </p>
            </div>
            <div
              style="
                background-color: #f4f4f4;
                padding: 0px 10px;
                height: auto;
                margin: 0 30px;
                border-top: 4px solid;
                color: black;
                display: flex;
                justify-content: space-between;
              "
            >
              <div style="flex: .75; text-align: left">
                <p>Arriving:</p>
                <p>In two days</p>
                <a
                  href="https://www.nextmiddleeast.com/profile/orders"
                  style="
                    text-decoration: none;
                    color: #a10244;
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #a10244;
                    color: white;
                    border-radius: 5px;
                    margin-top: 10px;
                  "
                  >View Order</a
                >
              </div>
              <div style="flex: 1.5; text-align: right; width: 50%">
                <p>Your order will be sent to:</p>
                <div class="txt2">
                  ${mailObj.address?.flat}, ${mailObj.address?.street},
                  ${mailObj.address?.city}, ${mailObj.address?.state},
                  ${mailObj.address?.pin_code}
                  <br />
                  Contact Number: ${mailObj.address?.alt_phone}
                </div>
              </div>
            </div>
            <div style="padding: 0px 30px; height: auto; text-align: justify">
              <p style="font-size: larger">Order summary</p>
              <hr style="border: 0; border-top: 1px solid #ccc" />
              <p>Order # ${mailObj?.orderId}</p>
              <p>Placed on  ${formattedDate}</p>
              <table>
                <tr>
                  <td>Item Subtotal:</td>
                  <td>${mailObj?.totalPrice}</td>
                </tr>
                <tr>
                  <td>Shipping & Handling:</td>
                  <td>Rs.0.00</td>
                </tr>
                <tr>
                  <td>Order Total:</td>
                  <td>${mailObj?.totalPrice}</td>
                </tr>
              </table>
              <hr
                style="border: 0; border-top: 1px solid #ccc; margin-bottom: 10px"
              />
              <p>
                To ensure your safety, the Delivery Agent will drop the package at
                your doorstep, ring the doorbell and then move back to maintain
                adequate distance while waiting for you to collect your package.
              </p>
              <p>We hope to see you again soon.</p>
              <h5>NEXTME.com</h5>
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
export { ToUserOrderPlaced };
