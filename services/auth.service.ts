import { getCookieValue } from "@/lib/cookies-store";
import { jwtVerify } from "jose";

export default class AuthService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
  private key: Uint8Array = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_KEY_APP as string
  );

  async login(email: string, password: string) {
    const response = await fetch(`${this.API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.status !== "success") {
      throw new Error(response.message);
    }

    return response;
  }

  async getSession() {
    const session = await getCookieValue("session");
    console.log(session);

    if (!session) {
      return null;
    }
    return await this.decrypt(session);
  }

  async decrypt(input: string): Promise<any> {
    try {
      const { payload } = await jwtVerify(input, this.key, {
        algorithms: ["HS256"],
      });
      return payload;
    } catch (error) {
      console.log(error);
    }
  }
}
