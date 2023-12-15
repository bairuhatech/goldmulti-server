import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserVerify } from "./userverify.entity";
import { DataResponseDto } from "../shared/dto/data-response-dto";
import {
  CreateUserVerifyDto,
  VerifyUserTokenDto,
} from "./dto/createUserVerify.dto";
import generateRandomString from "../shared/helpers/generateRandom";

@Injectable()
export class UserVerifyService {
  constructor(
    @Inject("UserVerifyRepository")
    private readonly UserVerifyRepository: typeof UserVerify
  ) {}

  async create(data: CreateUserVerifyDto) {
    try {
      const exist = await this.UserVerifyRepository.findOne({
        where: { userId: data?.userId },
      });
      if (exist) {
        await exist.destroy();
      }
      const random = generateRandomString();
      const userverify = new UserVerify();
      userverify.userId = data.userId;
      userverify.token = random;
      const created = await userverify.save();
      return created;
      //send mail
    } catch (err) {
      throw new Error("Failed to check");
    }
  }
  async check(data: VerifyUserTokenDto) {
    try {
      const verifyToken = await this.UserVerifyRepository.findOne({
        where: {
          userId: data.userId,
        },
      });
      if (!verifyToken) throw new Error("some error occured");
      if (verifyToken.token == data?.token) {
        await verifyToken.destroy();
        return true;
      }
      await verifyToken.destroy();
      return false;
    } catch (err) {
      throw new Error("some error occured");
    }
  }
}
