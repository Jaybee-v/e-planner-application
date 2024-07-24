import { authorizationHeader } from "@/lib/cookies-store";
import { CreateRiderDto } from "@/models/create/Rider";

export default class RiderService {
  private readonly API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async create(createRiderDto: CreateRiderDto) {
    try {
      const request = await fetch(`${this.API_URL}rider`, {
        method: "POST",
        headers: await authorizationHeader(),
        body: JSON.stringify(createRiderDto),
      }).then((res) => res.json());
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
    }
  }

  async getRider(id: string) {
    try {
      const request = await fetch(`${this.API_URL}rider/himself/${id}`, {
        method: "GET",
        headers: await authorizationHeader(),
      }).then((res) => res.json());
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
    }
  }
}
