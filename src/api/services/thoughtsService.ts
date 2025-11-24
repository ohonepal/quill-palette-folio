import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/config/constants';

export interface Thought {
  id: string;
  content: string;
  date: string;
}

export interface CreateThoughtDto {
  content: string;
}

export interface UpdateThoughtDto extends Partial<CreateThoughtDto> {}

export const thoughtsService = {
  async getAllThoughts(): Promise<Thought[]> {
    return apiClient.get<Thought[]>(API_ENDPOINTS.THOUGHTS.LIST, { requiresAuth: false });
  },

  async getThought(id: string): Promise<Thought> {
    return apiClient.get<Thought>(API_ENDPOINTS.THOUGHTS.GET(id), { requiresAuth: false });
  },

  async createThought(data: CreateThoughtDto): Promise<Thought> {
    return apiClient.post<Thought>(API_ENDPOINTS.THOUGHTS.CREATE, data);
  },

  async updateThought(id: string, data: UpdateThoughtDto): Promise<Thought> {
    return apiClient.put<Thought>(API_ENDPOINTS.THOUGHTS.UPDATE(id), data);
  },

  async deleteThought(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.THOUGHTS.DELETE(id));
  },
};
