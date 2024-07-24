export default class StableService {
  private API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  async findAllStoredByZip(zipcode: string) {
    try {
      const request = await fetch(`${this.API_URL}stable/store/${zipcode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
    }
  }

  async findStableById(id: string) {
    try {
      const request = await fetch(`${this.API_URL}stable/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
    }
  }
}
