import { RECENT_POST_LIMIT } from "@/constants";
import { axiosInstance } from "@/libraries/axios";
import post from "@/pages/api/post";

export class PostService {
  private static instance: PostService;
  private query = {};
  private prefix = "/post";

  // Degisn Pattern Singleton
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async createOne(data: any) {
    const post = await axiosInstance.post(this.prefix, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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

  async getMany() {
    const params = { findOptions: JSON.stringify(this.query) };
    const { posts, count } = await (
      await axiosInstance.get(this.prefix, { params })
    ).data;
    this.query = {};
    return { posts, count };
  }

  async getNewPosts() {
    const data = await this.findOptions({
      populate: "category",
      skip: 0,
      limit: 4,
    }).getMany();
    return data;
  }

  async getTheMostViewsPots() {
    const data = await this.findOptions({
      populate: "category",
      skip: 0,
      limit: 4,
      sort: [["views", -1]],
    }).getMany();
    return data;
  }

  async getRecentPosts() {
    const data = await this.findOptions({
      populate: "category",
      skip: 0,
      limit: RECENT_POST_LIMIT,
      sort: [["views", -1]],
    }).getMany();
    return data;
  }

  public findOptions(options: any = {}) {
    this.query = { ...this.query, ...options };
    return this;
  }
}
