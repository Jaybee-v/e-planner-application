import { authorizationHeader } from "@/lib/cookies-store";
import { CreateLessonDto } from "@/models/create/Lesson";

export default class LessonService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async create(createLessonDto: CreateLessonDto) {
    try {
      const response = await fetch(`${this.API_URL}/lessons`, {
        method: "POST",
        headers: await authorizationHeader(),
        body: JSON.stringify(createLessonDto),
      }).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
