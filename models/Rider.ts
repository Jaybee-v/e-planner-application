import { RiderAndStableM } from "./Stable";

export interface RiderM {
  id: string;
  name: string;
  lastname: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  level: number;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiderDataM {
  rider: RiderM;
  stable: RiderAndStableM[];
}

export interface RiderForOrganisationM {
  id: string;
  name: string;
  lastname: string;
  address: string;
  zipcode: string;
  level: number;
  city: string;
  country: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  status: number;
}
