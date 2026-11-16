import { api } from "./http";
import type { CategoryResponseDTO, JavaPageDTO } from "../Types/types";

export async function listCategories(signal?: AbortSignal): Promise<CategoryResponseDTO[]> {
  const categories = new Map<number, CategoryResponseDTO>();
  let page = 0;

  while (true) {
    const { data } = await api.get<JavaPageDTO<CategoryResponseDTO>>("/categories", {
      params: { page, size: 100, sort: "id,asc" },
      signal,
    });

    if (!Array.isArray(data?.content) || data.page?.number !== page ||
        !Number.isSafeInteger(data.page?.totalPages) || data.page.totalPages < 0 ||
        data.content.some(category => !Number.isSafeInteger(category?.id) || category.id <= 0 ||
          typeof category.name !== "string" || !category.name.trim())) {
      throw new Error("O servidor não retornou uma lista de categorias válida.");
    }

    for (const category of data.content) categories.set(category.id, category);
    if (page + 1 >= data.page.totalPages) return [...categories.values()];
    if (!data.content.length) {
      throw new Error("Não foi possível carregar todas as categorias. Tente novamente.");
    }
    page += 1;
  }
}
