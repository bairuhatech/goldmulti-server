import { Injectable } from "@nestjs/common";
import config from "../../../config";
import { Dialect } from "sequelize";

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return {
      dialect: "postgres" as Dialect,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      logging: false,
    };
  }

  get jwtConfig() {
    return { privateKey: config.jwtPrivateKey };
  }
}
