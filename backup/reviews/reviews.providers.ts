import { Reviews } from "./reviews.entity";

export const reviewsProviders = [
  { provide: "ReviewsRepository", useValue: Reviews },
];
