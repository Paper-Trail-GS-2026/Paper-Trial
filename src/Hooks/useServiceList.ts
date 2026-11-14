import { useState } from "react";
import { demoServices } from "../Data/ServicesData";
import { filterServices } from "../Utils/serviceFilters";

export function useServiceList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const services = filterServices(demoServices, search, category);

  const clearFilters = () => {
    setSearch("");
    setCategory("Todos");
  };

  return { services, search, setSearch, category, setCategory, clearFilters };
}
