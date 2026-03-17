import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { VoicesView } from "@/components/voices/voices-view";
import { voicesSearchParamsCache } from "@/lib/voices-params";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const metadata: Metadata = { title: "Voices" };

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
