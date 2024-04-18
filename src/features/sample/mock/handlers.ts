import { http, HttpResponse, PathParams } from 'msw'

import { mockSample, mockSampleList } from '@/features/sample/mock/data'
import { Sample, SampleCreateSeed } from '@/features/sample/model/type'

export const sampleHandlers = (apiOrigin: string) => {
	const fetchSamples = (response?: Partial<Sample>) => {
		const defaultResponses: Sample[] = mockSampleList
		return http.get(`${apiOrigin}/samples`, () => {
			return HttpResponse.json<Sample[]>(
				defaultResponses.map(defaultResponse => ({
					...defaultResponse,
					...response
				}))
			)
		})
	}

	const postSample = () => {
		return http.post<PathParams, SampleCreateSeed, Sample>(
			`${apiOrigin}/samples`,
			async ({ request }) => {
				const reqBody: SampleCreateSeed = await request.json()
				return HttpResponse.json<Sample>({ ...mockSample, ...reqBody })
			}
		)
	}

	return { fetchSamples, postSample }
}
