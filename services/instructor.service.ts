import { authorizationHeader } from "@/lib/cookies-store";
import { CreateInstructorDto } from "@/models/create/Instructor";
import { UpdateInstructorDto } from "@/models/update/Instructor";

export default class InstructorService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async create(createInstructorDto: CreateInstructorDto) {
    try {
      const response = await fetch(`${this.API_URL}stable/instructors`, {
        method: "POST",
        headers: await authorizationHeader(),
        body: JSON.stringify(createInstructorDto),
      }).then((res) => res.json());

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findByStableId(stableId: string) {
    try {
      const response = await fetch(
        `${this.API_URL}stable/instructors/by-stable/${stableId}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(instructorId: string) {
    try {
      const response = await fetch(
        `${this.API_URL}stable/instructors/${instructorId}`,
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

  async update(instructorId: string, updateInstructorDto: UpdateInstructorDto) {
    try {
      const response = await fetch(
        `${this.API_URL}stable/instructors/${instructorId}`,
        {
          method: "PATCH",
          headers: await authorizationHeader(),
          body: JSON.stringify(updateInstructorDto),
        }
      ).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
