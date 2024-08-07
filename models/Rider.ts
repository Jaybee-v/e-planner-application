import { StableM } from "./Stable";

export interface RiderM {
  id: string;
  name: string;
  lastname: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiderDataM {
  rider: RiderM;
  stable: StableM[];
}
