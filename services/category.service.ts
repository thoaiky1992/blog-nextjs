import { axiosInstance } from "@/libraries/axios";

export class CategoryService {
  private static instance: CategoryService;
  private query = {};
  private prefix = "/category";

  // Degisn Pattern Singleton
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async getMany() {
    const params = { findOptions: JSON.stringify(this.query) };
    const { categories, count } = await (
      await axiosInstance.get(this.prefix, { params })
    ).data;
    this.query = {};
    return { categories, count };
  }

  async createOne(data: any) {
    const post = await axiosInstance.post(this.prefix, data);
    return post;
  }
  async deleteOne(id: string) {
    const result = await axiosInstance.delete(this.prefix + "/" + id);
    return result;
  }

  async updateOne(id: string, data: any) {
    const result = await axiosInstance.put(this.prefix + "/" + id, data);
    return result;
  }

  public findOptions(options: Object = {}) {
    this.query = { ...this.query, ...options };
    return this;
  }
}
