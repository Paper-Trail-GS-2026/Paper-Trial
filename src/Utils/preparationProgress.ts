import { demoServices } from "../Data/ServicesData";
import type { Preparation } from "../Types/types";

export function preparationProgress(preparation: Preparation) {
  const items = demoServices.find(s => s.id === preparation.serviceId)?.requirements || [];
  return {
    total: items.length,
    pending: items.length - preparation.completed.length,
    ready: items.length > 0 && items.every((item, index) => !item.required || preparation.completed.includes(index)),
  };
}
