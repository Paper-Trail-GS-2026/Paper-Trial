import { useState } from "react";
import { useServices } from "./useServices";
import type { CatalogService } from "../Types/types";
import { filterServices } from "../Utils/serviceFilters";
import { useCategories } from "./useCategories";

export function useServiceList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState<number | null>(null);
  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data ?? [];
  const selected = categories.find(item => item.id === selectedCategory);
  const category = selected?.id ?? null;
  const servicesQuery = useServices();
  const catalog: CatalogService[] = (servicesQuery.data ?? []).map(service => ({
    id: String(service.id),
    categoryId: service.categoryId,
    name: service.title,
    category: categories.find(item => item.id === service.categoryId)?.name ?? "Categoria indisponível",
    description: service.description,
    cityName: service.cityName,
    version: service.version,
  }));
  const services = filterServices(catalog, search, category);

  const clearFilters = () => {
    setSearch("");
    setCategory(null);
  };

  return { services, search, setSearch, category, setCategory, clearFilters, categories, categoriesQuery, servicesQuery };
}
