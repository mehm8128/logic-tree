import { ReactElement, Suspense } from 'react'
import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary'

export default function SuspenseWithErrorBoundary({
	fallback,
	children
}: { fallback: ReactElement; children: React.ReactNode }) {
	return (
		<BaseErrorBoundary fallback={<div>Something went wrong</div>}>
			<Suspense fallback={fallback}>{children}</Suspense>
		</BaseErrorBoundary>
	)
}
