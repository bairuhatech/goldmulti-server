const jwt = require("jsonwebtoken");
import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { login_Request, login_phone, login_google } from "./dto/login.dto";
import { signup_Request } from "./dto/signup.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { UserService } from "../USERS/user.services";
import { MailService } from "../MAILS/Mails.services";
import { RolesConfigService } from "../ROLES_CONFIG/rolesConfig.services";
import { getErrorMessage } from "../shared/helpers/errormessage";
import { VerifyMailDto } from "./dto/verifyMail.dto";
import { UserVerifyService } from "../USER_VERIFY/userverify.service";
import { VerifyUserTokenDto } from "./dto/verifyToken.dto";
import { genSalt, hash } from "bcrypt";
import { User } from "../USERS/user.entity";
const SignupHtml = require("../MAILS/templates/auth/SignupHtml");
const VerifyMail = require("../MAILS/templates/auth/mailVerfication");

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private mailService: MailService,
    private rolesConfigService: RolesConfigService,
    private readonly userVerifyService: UserVerifyService
  ) {}

  async signup(body: signup_Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const checkUser: any = await this.userService.checkExisit(body);
        if (checkUser && checkUser.length) {
          let message = "User already exisit.please try diffrent one.";
          let exisit = new DataResponseDto({}, false, message);
          resolve(exisit);
        } else {
          const addUser: any = await this.userService.create(body);
          if (addUser?._id) {
            const token = jwt.sign({ data: { id: addUser._id } }, "hahahah", {
              expiresIn: "30days",
            });
            let Mail = await SignupHtml(addUser, token);
            this.mailService.AuthMail(Mail);
            let message = "Account created successfully.";
            let success = new DataResponseDto(addUser, true, message);
            resolve(success);
          } else {
            let message = "signup Faild. Please try again, " + addUser?.message;
            let faild = new DataResponseDto({}, false, message);
            resolve(faild);
          }
        }
      } catch (err) {
        let message = `signup Faild. Please try again, ${getErrorMessage(err)}`;
        let error = new DataResponseDto({}, false, message);
        resolve(error);
      }
    });
  }

  async mailVerify(body: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const verified = jwt.verify(body?.token, "hahahah");
        if (verified?.data?.id) {
          let Users: any = await this.userService.findOne(verified?.data?.id);
          let verify = await this.userService.verifyMail(Users?.id);
          let message = "Mail verified successfully.";
          let success = new DataResponseDto(Users, true, message);
          resolve(success);
        } else {
          let message = `Mail verificaiton Faild. Please try again`;
          let error = new DataResponseDto({}, false, message);
          resolve(error);
        }
      } catch (err) {
        let message = `Mail verificaiton Faild. Please try again.error => ${err}`;
        let error = new DataResponseDto({}, false, message);
        resolve(error);
      }
    });
  }

  async mailVerifyLink(body: any) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (err) {
        let message = `Mail verificaiton Faild. Please try again.error => ${err}`;
        let error = new DataResponseDto({}, false, message);
        resolve(error);
      }
    });
  }

  async login(body: login_Request) {
    try {
      const { email, password } = body;
      const user: any = await this.userService.findEmail(email);
      if (user) {
        if (user?.status == false)
          return new DataResponseDto(
            {},
            false,
            "Your Account has been Deactivated."
          );
        const isMatch = await compare(
          password,
          user.password ? user.password : ""
        );
        const findMenus = await this.rolesConfigService.findMenusForRole(
          user?.role_id
        );

        if (isMatch) {
          let message = "User login success";
          let details = {
            statusCode: 200,
            status: true,
            message: message,
            data: user,
          };
          if (findMenus?.data.length) {
            details["menus"] = findMenus?.data;
          } else {
            details["menus"] = [];
          }
          return details;
        } else {
          let message = "The Password you entered is not valid";
          return new DataResponseDto({}, false, message);
        }
      } else {
        let message = "No user Found";
        let errorCode = new DataResponseDto({}, false, message);
        return errorCode;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async phoneLogin(body: login_phone) {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await this.userService.findPhone(body);
        if (user?._id) {
          if (user?.status == false)
            resolve(
              new DataResponseDto(
                {},
                false,
                "Your Account has been Deactivated."
              )
            );
          const findMenus = await this.rolesConfigService.findMenusForRole(
            user.role_id
          );
          let message = "User login success";
          let details = {
            statusCode: 200,
            status: true,
            message: message,
            data: user,
          };
          if (findMenus?.data.length) {
            details["menus"] = findMenus?.data;
          } else {
            details["menus"] = [];
          }
          resolve(details);
        } else {
          let message = "Login Faild.No user Found";
          let errorCode = new DataResponseDto({}, false, message);
          resolve(errorCode);
        }
      } catch (err) {
        console.log("err = = = = >", err);
        let message = `Login Faild. Please try again.error => ${err}`;
        let error = new DataResponseDto({}, false, message);
        resolve(error);
      }
    });
  }

  async googleLogin(body: login_google) {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await this.userService.findEmail(body?.email);
        if (user) {
          if (user?.status == false)
            resolve(
              new DataResponseDto(
                {},
                false,
                "Your Account has been Deactivated."
              )
            );
          const findMenus = await this.rolesConfigService.findMenusForRole(
            user.role_id
          );

          let message = "User login success";
          let details = {
            statusCode: 200,
            status: true,
            message: message,
            data: user,
          };
          if (findMenus?.data.length) {
            details["menus"] = findMenus?.data;
          } else {
            details["menus"] = [];
          }
          resolve(details);
        } else {
          const addUser: any = await this.userService.createGmail(body);
          if (addUser?._id) {
            let Mail = await SignupHtml(addUser, null);
            this.mailService.AuthMail(Mail);
            let message = "Account created successfully.";
            let success = {
              data: addUser,
              status: true,
              message: message,
              newAccount: true,
            };
            resolve(success);
          } else {
            let message = "Login Faild.No user Found";
            let errorCode = new DataResponseDto({}, false, message);
            resolve(errorCode);
          }
        }
      } catch (err) {
        console.log("err = = = = >", err);
        let message = `Login Faild. Please try again.error => ${err}`;
        let error = new DataResponseDto({}, false, message);
        resolve(error);
      }
    });
  }

  async forgot(body: login_Request) {
    try {
    } catch (err) {
      console.log("err = = = = >", err);
    }
  }
  async verifyEmail(user: VerifyMailDto) {
    try {
      const userDetails: any = await this.userService.findOne(user.userId);
      if (!userDetails) return new DataResponseDto({}, false, "No user found");
      if (userDetails?._id) {
        const token = await this.userVerifyService.create(user);
        let Mail = await VerifyMail(userDetails, token?.token);
        this.mailService.AuthMail(Mail);
        //ssend mail
        return new DataResponseDto(userDetails, true, "Email has been sent");
      }
    } catch (err) {
      return new DataResponseDto({}, true, "Failed to verify Email");
    }
  }
  async verifyEmailToken(user: VerifyUserTokenDto) {
    try {
      const userDetails: any = await User.findByPk(user.userId);
      if (!userDetails) return new DataResponseDto({}, false, "No user found");
      const token = await this.userVerifyService.check(user);
      if (token) {
        userDetails.mail_verify = true;
        await userDetails.save();
        return new DataResponseDto(
          userDetails,
          true,
          "Email verified successfully"
        );
      } else {
        return new DataResponseDto({}, false, "Failed to verify Email");
      }
    } catch (err) {
      console.log(err);
      return new DataResponseDto({}, false, "Failed to verify Email");
    }
  }
}
