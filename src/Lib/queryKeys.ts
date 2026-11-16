export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    list: () => ['categories', 'list'] as const,
  },
  services: {
    all: ['services'] as const,
    list: () => ['services', 'list'] as const,
    detail: (id: string) => ['services', 'detail', id] as const,
    requirements: (id: string) => ['services', 'requirements', id] as const,
  },
  preparations: {
    all: ['preparations'] as const,
    list: (userId?: number) => ['preparations', 'list', userId] as const,
    detail: (id: string, userId?: number) => ['preparations', 'detail', userId, id] as const,
  },
};
