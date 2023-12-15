import { Following } from "./following.entity";

export const followingsProviders = [
  { provide: "FollowingsRepository", useValue: Following },
];
