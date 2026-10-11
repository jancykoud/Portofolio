"use client";

import { useParams } from "next/navigation";
import { getDictionary } from "./dictionaries";
import { isLocale, type Locale } from "./routing";

/** Current locale from the [lang] segment (client components). */
export function useLocale(): Locale {
  const params = useParams<{ lang?: string }>();
  return params?.lang && isLocale(params.lang) ? params.lang : "fr";
}

export function useDict() {
  return getDictionary(useLocale());
}
