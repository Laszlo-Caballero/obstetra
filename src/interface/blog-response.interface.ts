import { Recurso } from './auth.interface';
import { ResponseBlogCategoria } from './response.interface';
import { ResponseUser } from './user.interface';

export enum ComponentType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  NOTE = 'NOTE',
  LIST = 'LIST',
  ARTICLES = 'ARTICLES',
  BADGES = 'BADGES',
}

export enum StatusType {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNKNOWN = 'UNKNOWN',
}

export interface TextInterface {
  text: string;
  highlight?: {
    text: string;
    bold?: boolean;
  };
}

interface ListItem {
  title: string;
  text: TextInterface;
}

export interface ComponentProps {
  type: ComponentType;
  text?: TextInterface[];
  listItems?: ListItem[];
  image: Recurso[];
  articles?: number[];
}

export interface ResponseBlog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  legend: string;
  image: Recurso;
  category: ResponseBlogCategoria[];
  components: ComponentProps[];
  user: ResponseUser;
  status: StatusType;
  createdAt: string;
  blogId: number;
  __v: number;
}
