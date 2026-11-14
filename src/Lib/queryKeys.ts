export const queryKeys = {
  services: {
    all: ['services'] as const,
    list: () => ['services', 'list'] as const,
    detail: (id: string) => ['services', 'detail', id] as const,
  },
  preparations: {
    all: ['preparations'] as const,
    list: () => ['preparations', 'list'] as const,
    detail: (id: string) => ['preparations', 'detail', id] as const,
  },
};
