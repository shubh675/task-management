/* types for react-query and other */


import { type inferReactQueryProcedureOptions, } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from "@/trpc/server-side/root";


export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;