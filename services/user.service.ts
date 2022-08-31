import { axiosInstance } from "@/libraries/axios";

export class UserService {
  private static instance: UserService;
  private query = {};
  private prefix = "/user";

  // Degisn Pattern Singleton
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async getMany() {
    const params = { findOptions: JSON.stringify(this.query) };
    const { users } = await (
      await axiosInstance.get(this.prefix, { params })
    ).data;
    this.query = {};
    return users;
  }

  async updateOne(id: string, data: any) {
    const result = await axiosInstance.put(this.prefix + "/" + id, data);
    return result;
  }

  public findOptions(options: any = {}) {
    this.query = { ...this.query, ...options };
    return this;
  }
}
