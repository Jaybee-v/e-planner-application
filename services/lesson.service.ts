import { authorizationHeader } from "@/lib/cookies-store";
import { CreateLessonDto } from "@/models/create/Lesson";

export default class LessonService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async create(createLessonDto: CreateLessonDto) {
    try {
      const response = await fetch(`${this.API_URL}lessons`, {
        method: "POST",
        headers: await authorizationHeader(),
        body: JSON.stringify(createLessonDto),
      }).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findByHostId(hostId: string, date: string) {
    try {
      console.log("Host ID:", hostId);
      console.log("Date:", new Date(date));

      const response = await fetch(`${this.API_URL}lessons/stable-by-date`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: hostId, date }),
      }).then((res) => res.json());
      console.log(response.data);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
