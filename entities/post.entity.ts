import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";

export interface PostEntity {
  _id: string;
  user: string | UserEntity;
  category: string | CategoryEntity;
  title: string;
  seo_title: string;
  description: string;
  body: string;
  image: string;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  active: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
