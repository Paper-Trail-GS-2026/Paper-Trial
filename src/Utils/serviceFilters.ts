import { PublicService } from "../Types/types";

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function filterServices(services: PublicService[], search: string, category: string) {
  const query = normalizeSearch(search);
  return services.filter((service) =>
    (category === "Todos" || service.category === category) &&
    normalizeSearch(`${service.name} ${service.category}`).includes(query)
  );
}
