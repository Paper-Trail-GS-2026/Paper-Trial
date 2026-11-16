import { CatalogService } from "../Types/types";

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function filterServices(services: CatalogService[], search: string, category: number | null) {
  const query = normalizeSearch(search);
  return services.filter((service) =>
    (category === null || service.categoryId === category) &&
    normalizeSearch(`${service.name} ${service.category} ${service.description} ${service.cityName}`).includes(query)
  );
}
