import {
	Sample,
	SampleCreateSeed,
	SampleCreateSeedData,
	SampleData,
	SampleListQuery,
	SampleListQueryData,
	parseId
} from '@/features/sample/model/type'

export const convertSampleListQueryToData = (
	query?: Partial<SampleListQuery>
): SampleListQueryData => {
	return {
		id: query?.id
	}
}

export const convertSampleFromData = (data: SampleData): Sample => {
	return {
		...data,
		id: parseId(data.id)
	}
}

export const convertSampleCreateSeedToData = (
	seed: SampleCreateSeed
): SampleCreateSeedData => {
	return {
		name: seed.name,
		age: seed.age,
		bio: seed.bio
	}
}
