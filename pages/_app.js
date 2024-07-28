import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DataProvider } from '@/context/DataContext';
import "@/styles/globals.css";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>                 
      </DataProvider>
    </QueryClientProvider>
);
}
