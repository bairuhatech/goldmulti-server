const VerifyMail = async (Details: any, token: any) => {
  const email = `http://localhost:3000/verify/email/${Details?._id}/${token}`;
  const emaillive = `https://www.nextmiddleeast.com/verify/email/${Details?._id}/${token}`;
  try {
    let obj = {
      to: Details?.email,
      subject: `NextME Email verification`,
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
        <div style="border-top: 20px solid #a10244">
          <img
            src="https://bairuha-bucket.s3.ap-south-1.amazonaws.com/nextmiddleeast/logo.95174a95f2415bfa4f0f.png"
            alt="logo"
            style="width: 200px; height: 70px; object-fit: contain"
          />
        </div>
        <br />
        <div style="color: #262941; font-weight: bold; font-size: 20px">
          Verify your email
        </div>
        <br />
      </div>

      <div style="padding: 20px">
        <p style="font-size: 16px">Hello,</p>
        <p style="font-size: 13px; color: gray">
          You’re almost there. Just tap the email verification button below to
          complete setting up your NextME account.
        </p>
        <div style="align-content: center">
          <a
            href="${emaillive}"
            style="
              text-decoration: none;
              color: white;
              padding: 10px 20px;
              background-color: #a10244;
              border-radius: 20px;
              margin-top: 10px;
              margin: 0 215px;
              text-align: center
            "
            >Verify</a
          >
        </div>
        <p>We are thrilleed to welcome you,</p>
        <p>Cheers,</p>
        <p>Team Next ME</p>
        <br />
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
</html>`,
    };
    return obj;
  } catch (err) {
    let obj = {};
    return obj;
  }
};
module.exports = VerifyMail;
