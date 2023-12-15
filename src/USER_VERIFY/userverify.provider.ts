import { UserVerify } from "./userverify.entity";

export const UserVerifyProvider = [
  { provide: "UserVerifyRepository", useValue: UserVerify },
];
