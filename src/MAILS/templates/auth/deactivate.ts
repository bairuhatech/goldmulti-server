const DeactivateMail = (user, token) => {
  return {
    to: user?.email,
    subject: "Account Deactivated.",
    template: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div
      style="
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        border-radius: 10px;
        max-width: 600px;
        background-color: #ffffff;
        margin: 0 auto;
      "
    >
      <div style="text-align: center">
        <div style="border-top: 20px solid #a10244; background-color: #ececec">
          <img
            src="https://bairuha-bucket.s3.ap-south-1.amazonaws.com/nextmiddleeast/logo.95174a95f2415bfa4f0f.png"
            alt="logo"
            style="width: 200px; height: 70px; object-fit: contain"
          />
        </div>
        <br />
        <div style="color: #262941; font-weight: bold; font-size: 20px">
          Account Deactivated!
        </div>
        <br />
      </div>

      <div style="padding: 20px">
        <p style="font-size: 16px">Hello ${user?.name} ,</p>
        <p style="font-size: 13px; color: gray">
          This email confirms that your NextME account has been deactivated as
          per your request. We are really sorry to see you go, but thanks for
          gving us a try.
        </p>
        <p>Thanks for being a Next ME customer</p>
        <p>Best Regards,</p>
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
</html>
`,
  };
};

module.exports = DeactivateMail;
