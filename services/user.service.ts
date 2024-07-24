import { CreateUserDto } from "@/models/create/User";

export default class UserService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async create(createUserDto: CreateUserDto) {
    try {
      const response = await fetch(`${this.API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserDto),
      }).then((res) => res.json());

      if (response.status !== "success") {
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
