import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Rotues from "./routes/Routes"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Rotues/>
    </QueryClientProvider >
  )
}

export default App