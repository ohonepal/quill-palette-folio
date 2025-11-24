import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/config/constants';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
}

export interface CreateBlogPostDto {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image?: string;
}

export interface UpdateBlogPostDto extends Partial<CreateBlogPostDto> {}

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    return apiClient.get<BlogPost[]>(API_ENDPOINTS.BLOG.LIST, { requiresAuth: false });
  },

  async getPost(id: string): Promise<BlogPost> {
    return apiClient.get<BlogPost>(API_ENDPOINTS.BLOG.GET(id), { requiresAuth: false });
  },

  async createPost(data: CreateBlogPostDto): Promise<BlogPost> {
    return apiClient.post<BlogPost>(API_ENDPOINTS.BLOG.CREATE, data);
  },

  async updatePost(id: string, data: UpdateBlogPostDto): Promise<BlogPost> {
    return apiClient.put<BlogPost>(API_ENDPOINTS.BLOG.UPDATE(id), data);
  },

  async deletePost(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.BLOG.DELETE(id));
  },
};
