import { notFound } from "next/navigation";

/** Any unknown URL ends here, so the localized 404 renders inside the right root layout. */
export default function CatchAll() {
  notFound();
}
