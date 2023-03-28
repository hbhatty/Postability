"use client";
//this file wraps our entire application with tanstack

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast"

//defines the typing 
interface Props {
    children?: ReactNode
}

const queryClient = new QueryClient();

export default function QueryWrap ({ children }: Props) {
  // console.log({children});
  return(
  <QueryClientProvider client={queryClient}> <Toaster/>{children}</QueryClientProvider>
  )
}

// export default QueryWrap;
