import { User } from "./user.entity";

export const UserProviders = [{ provide: "UserRepository", useValue: User }];
