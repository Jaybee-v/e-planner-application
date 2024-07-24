export interface CreateStableDto {
  id: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
  stableStorerId: number | null;
}
