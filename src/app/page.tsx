import { cn } from "@/lib/utils";
import { getQueryClient, trpc } from "@/trpc/server";
import { caller } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
const Page =async()=>{
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
  const users = await caller.getUsers();
   return (
    <div className={cn("text-3xl font-bold underline")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading...</p>}>
          <Client/>
        </Suspense>
      </HydrationBoundary>
      
    </div>
   )
}
export default Page;