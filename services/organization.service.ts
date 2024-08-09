import { authorizationHeader } from "@/lib/cookies-store";
import { CreateOrganizationDto } from "@/models/create/Organization";

export default class OrganizationService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const request = await fetch(`${this.API_URL}organizations`, {
        method: "POST",
        headers: await authorizationHeader(),
        body: JSON.stringify(createOrganizationDto),
      }).then((res) => res.json());
      return request;
    } catch (error) {
      console.log(error);
    }
  }

  async findByRiderId(riderId: string) {
    try {
      const response = await fetch(
        `${this.API_URL}organizations/by-rider/${riderId}`,
        {
          method: "GET",
          headers: await authorizationHeader(),
        }
      ).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findByStableId(stableId: string) {
    try {
      const response = await fetch(
        `${this.API_URL}organizations/by-stable/${stableId}`,
        {
          method: "GET",
          headers: await authorizationHeader(),
        }
      ).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
