'use client'

import SuspenseWithErrorBoundary from '@/components/SuspenseWithErrorBoundary'
import Sample from '@/features/sample/components/Sample'

export default function Container() {
	return (
		<div>
			aaa
			<SuspenseWithErrorBoundary fallback={<div>loading...</div>}>
				<Sample />
			</SuspenseWithErrorBoundary>
		</div>
	)
}
