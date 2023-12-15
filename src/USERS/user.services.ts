import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";
import { Op } from "sequelize";

import { User } from "./user.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import { MailService } from "../MAILS/Mails.services";
import { UserDeactivateDto } from "./dto/userDeactivate.dto";
import { getErrorMessage } from "../shared/helpers/errormessage";
import { UserPasswordUpdateDto } from "./dto/updatePassword.dto";
import { compare } from "bcrypt";
const DeactivateMail = require("../MAILS/templates/auth/deactivate");

@Injectable()
export class UserService {
  constructor(
    @Inject("UserRepository")
    private readonly UserRepository: typeof User,
    private readonly mailService: MailService
  ) {}

  async findById(id: number) {
    try {
      const data = await this.UserRepository.findByPk<User>(id, {});
      if (!data) {
        throw new HttpException("No ID found", HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {}
  }
  async findAll(data: any) {
    try {
      let whereCase = {};
      if (data.name) {
        whereCase["first_name"] = {
          [Op.like]: `%${data.name}%`,
        };
      }
      const user = await this.UserRepository.findAll({
        where: whereCase,
      });
      return user;
    } catch (err) {
      console.log("findAll", err);
    }
  }

  async findOne(_id: any) {
    try {
      const user = await User.findOne({ where: { _id: _id }, raw: true });
      return user;
    } catch (err) {
      console.log("findOne", err);
      return {};
    }
  }

  async findEmail(email: string) {
    try {
      const user = await this.UserRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (err) {
      console.log("findEmail", err);
      return {};
    }
  }

  async findPhone(data: any) {
    try {
      const user = await this.UserRepository.findOne({
        where: { [Op.and]: { countrycode: data?.code, phone: data?.phone } },
        raw: true,
      });
      return user;
    } catch (err) {
      console.log("findPhone", err);
      return {};
    }
  }

  async checkExisit(data: any) {
    try {
      const user = await this.UserRepository.findAll({
        where: { [Op.or]: [{ email: data?.email }, { phone: data?.phone }] },
        raw: true,
      });
      return user;
    } catch (err) {
      console.log("checkExisit", err);
      return {};
    }
  }

  async verifyMail(id: any) {
    try {
      return true;
    } catch (err) {
      console.log("checkExisit", err);
      return {};
    }
  }

  async create(data: any) {
    try {
      const salt = await genSalt(10);
      let password = await hash(data?.password, salt);
      const user = new User();
      user.username = data?.username;
      user.password = password;
      user.first_name = data?.first_name;
      user.last_name = data?.last_name;
      user.name = data?.name;
      user.email = data?.email;
      user.countrycode = data?.countrycode;
      user.phone = data?.phone;
      user.type = data?.type;
      user.mail_verify = false;
      user.phone_verify = data?.phone_verify;
      user.status = true;
      const newUser = await user.save();
      return newUser;
    } catch (err) {
      // console.log("create", err);
      return { message: getErrorMessage(err) };
    }
  }
  async createSeller(store_id: any, data: any) {
    try {
      const salt = await genSalt(10);
      let password = await hash(data?.password, salt);
      const user = new User();
      user.username = data?.name;
      user.password = password;
      user.first_name = data?.first_name;
      user.last_name = data?.last_name;
      user.name = data?.name;
      user.email = data?.email;
      user.countrycode = data?.code;
      user.phone = data?.phone;
      user.type = "seller";
      user.mail_verify = false;
      user.phone_verify = true;
      user.status = true;
      user.store_id = store_id;
      user.role = "seller";
      const newUser = await user.save();
      return new DataResponseDto(newUser, true, "New Seller created");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }

  async updateUserToSeller(store_id: any, data: any) {
    try {
      const User = await this.findById(data.userId);
      if (!User) {
        throw new Error("User not found");
      }
      User.store_id = store_id;
      User.type = "seller";
      User.role = "seller";
      const newUser = await User.save();
      return newUser;
    } catch (error) {
      return error.message;
    }
  }

  async createGmail(data: any) {
    try {
      const user = new User();
      user.first_name = data?.first_name;
      user.last_name = data?.last_name;
      user.username =
        data?.first_name?.trim().toLowerCase() +
        `@${Math.floor(Math.random() * 10000)}`;
      user.name = data?.name;
      user.email = data?.email;
      user.type = data?.type;
      user.image = data?.image;
      user.mail_verify = true;
      user.status = true;
      const newUser = await user.save();
      return newUser;
    } catch (err) {
      console.log("create", err);
      return {};
    }
  }

  async updateRole(id: number, updateUser: any) {
    try {
      const User = await this.findById(id);
      if (!User) {
        throw new Error("User not found");
      }
      User.role_id = updateUser?.role_id || User.role_id;
      User.store_id = updateUser?.store_id || User.store_id;
      User.role = updateUser?.role || User.store_id;

      const newUser = await User.save();
      return newUser;
    } catch (error) {
      return error.message;
    }
  }

  async updateEmail(id: number, updateUser: any) {
    try {
      const User = await this.findById(id);
      if (!User) {
        throw new Error("User not found");
      }
      User.email = updateUser?.email;
      User.mail_verify = false;
      const newUser = await User.save();
      await this.mailService.updateEmailNotify({
        to: User?.email,
        subject: "Email Updated",
      });
      return new DataResponseDto(newUser, true, "Email updated successfully");
    } catch (error) {
      return new DataResponseDto({}, false, getErrorMessage(error));
    }
  }

  async updatePhoto(id: number, updateUser: any) {
    try {
      const User = await this.findById(id);
      if (!User) {
        throw new Error("User not found");
      }
      User.image = updateUser?.image;
      const newUser = await User.save();
      return new DataResponseDto(newUser, true, "Photo updated successfully");
    } catch (error) {
      return new DataResponseDto({}, false, getErrorMessage(error));
    }
  }

  async updatePhone(id: number, updateUser: any) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.phone = updateUser?.phone;
      user.countrycode = updateUser?.countrycode;
      user.phone_verify = true;
      const newUser = await user.save();
      return new DataResponseDto(newUser, true, "succesfull");
    } catch (error) {
      return new DataResponseDto({}, false, error.message);
    }
  }
  async updatePassword(id: number, updatePassword: UserPasswordUpdateDto) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await compare(updatePassword?.oldPassword, user.password);
      if (isMatch) {
        const salt = await genSalt(10);
        let password = await hash(updatePassword?.newPassword, salt);
        user.password = password;
        await user.save();
        return new DataResponseDto(
          user,
          true,
          "Password Updated Successfully."
        );
      } else {
        return new DataResponseDto(
          {},
          false,
          "Incorrect password, please try again."
        );
      }
    } catch (error) {
      return new DataResponseDto({}, false, getErrorMessage(error));
    }
  }
  async updateName(id: number, updateUser: any) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.first_name = updateUser.first_name;
      user.last_name = updateUser.last_name;
      user.name = updateUser.first_name + " " + updateUser?.last_name;
      const newUser = await user.save();
      return new DataResponseDto(
        newUser,
        true,
        "Username updated successfully"
      );
    } catch (error) {
      return new DataResponseDto({}, false, getErrorMessage(error));
    }
  }

  async softdelete(id: number) {
    try {
      console.log("err = = = = >,delete");
    } catch (err) {
      console.log("softdelete", err);
    }
  }

  async delete(id: number) {
    try {
      console.log("err = = = = >,delete");
    } catch (err) {
      console.log("delete", err);
    }
  }
  async deactivateUser(id: number, activate: UserDeactivateDto) {
    try {
      const result = await this.UserRepository.sequelize.transaction(
        async (transaction) => {
          const user = await this.UserRepository.findByPk(id, {
            transaction: transaction,
          });
          if (!user) throw new Error("no user found");
          user.status = false;
          await user.save({ transaction: transaction });
          transaction.afterCommit(async () => {
            let Mail = await DeactivateMail(user, {});
            this.mailService.AuthMail(Mail);
          });
          return user;
        }
      );
      return new DataResponseDto(result, true, "User Deactivated successfully");
    } catch (err) {
      return new DataResponseDto({}, false, err.message);
    }
  }
  async addPassword(id: number, updatePassword: UserPasswordUpdateDto) {
    try {
      const user = await this.UserRepository.findByPk(id);
      if (!user) throw new Error("no user found");
      const salt = await genSalt(10);
      let password = await hash(updatePassword?.newPassword, salt);
      user.password = password;
      await user.save();
      return new DataResponseDto(user, true, "Password Added successfully");
    } catch (err) {
      return new DataResponseDto({}, false, getErrorMessage(err));
    }
  }
}
