import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const t = trpc;
export const router = t.router;
