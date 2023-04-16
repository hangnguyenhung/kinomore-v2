export interface HeroMovie {
  id: number;
  year: number;
  rating: string;
  title: string;
  genre: string;
  image: string;
}

export interface AuthDto {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
