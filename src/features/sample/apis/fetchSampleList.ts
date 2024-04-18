import {
	SampleList,
	SampleListData,
	SampleListQuery
} from '@/features/sample/model/type'
import { getApiOrigin } from '@/lib/env'
import { convertSampleFromData } from './converter'

import { fetcher } from '@/lib/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

const fetchSampleList = async (
	query?: Partial<SampleListQuery>
): Promise<SampleList> => {
	const queryParams = new URLSearchParams()
	for (const q in query) {
		const value = query[q as keyof typeof query]
		if (value !== undefined) {
			queryParams.append(q, value)
		}
	}
	const res: SampleListData = await fetcher(
		`${getApiOrigin()}/samples?${queryParams}`
	)

	return res.map(convertSampleFromData)
}

export const useSampleList = (query?: Partial<SampleListQuery>) => {
	return useSuspenseQuery({
		queryKey: ['/samples', query],
		queryFn: () => fetchSampleList(query)
	})
}
