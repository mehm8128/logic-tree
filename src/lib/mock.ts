import { HttpHandler } from 'msw'

import { sampleHandlers } from '@/features/sample/mock/handlers'

import { getApiOrigin } from '@/lib/env'

export const getHandlersArray = (
	handlers: Record<string, () => HttpHandler>
): HttpHandler[] => {
	return Object.values(handlers).map(handler => handler())
}

const handlers = (apiOrigin: string) => {
	return [getHandlersArray(sampleHandlers(apiOrigin))].flat()
}

export const initMock = async () => {
	if (process.env.NODE_ENV === 'development') {
		if (typeof window !== 'undefined') {
			const setupWorker = await import('msw/browser').then(m => m.setupWorker)
			const worker = setupWorker(...handlers(getApiOrigin()))
			await worker.start({
				onUnhandledRequest(req, print) {
					if (req.url.includes('/__next')) {
						return
					}
					print.warning()
				}
			})
		} else {
			const setupServer = await import('msw/node').then(m => m.setupServer)
			const server = setupServer(...handlers(getApiOrigin()))
			server.listen()
		}
	}
}
