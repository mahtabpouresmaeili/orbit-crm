import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import type { ReactNode } from "react"

const queryClient = new QueryClient();

interface QueryproviderProps {
    children : ReactNode
}

export function QueryProvider({children}:QueryproviderProps){
    return(
        <QueryClientProvider client={queryClient }>
            {children}
        </QueryClientProvider>
    )
}