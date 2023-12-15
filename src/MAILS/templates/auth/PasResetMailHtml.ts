const PasResetMailHtml = async (Details: any, token: any) => {
  try {
    let obj = {
      to: Details?.email,
      subject: `NextME password reset Mail`,
      template: `<html>
              <body>
              <h1>Normal Signup</h1>
              </body>
            </html>`,
    };
    return obj;
  } catch (err) {
    let obj = {};
    return obj;
  }
};
export { PasResetMailHtml };
