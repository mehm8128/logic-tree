'use client'

import { KumaRegistry } from '@kuma-ui/next-plugin/registry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { Provider as JotaiProvider } from 'jotai'

import { initMock } from '@/lib/mock'

void initMock()

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<KumaRegistry>
			<JotaiProvider>
				<QueryClientProvider client={queryClient}>
					<ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
				</QueryClientProvider>
			</JotaiProvider>
		</KumaRegistry>
	)
}
