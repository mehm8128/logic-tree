import {
	Output,
	brand,
	minLength,
	minValue,
	number,
	object,
	optional,
	safeParse,
	string
} from 'valibot'

export const sampleId = brand(string(), 'SampleId')
export type SampleId = Output<typeof sampleId>
export const parseId = (id: string) => {
	const result = safeParse(sampleId, id)
	if (!result.success) {
		throw new Error('invalid id')
	}
	return result.output
}

export const sampleSchema = object({
	id: sampleId,
	name: string(),
	age: number(),
	bio: string()
})
export type Sample = Output<typeof sampleSchema>
export type SampleList = Sample[]

export const sampleListQuerySchema = object({
	id: sampleId
})
export type SampleListQuery = Output<typeof sampleListQuerySchema>

export const sampleCreateSeedSchema = object({
	name: string([minLength(1)]),
	age: number([minValue(1)]),
	bio: string()
})
export type SampleCreateSeed = Output<typeof sampleCreateSeedSchema>

export const sampleDataSchema = object({
	id: string(),
	name: string(),
	age: number(),
	bio: string()
})
export type SampleData = Output<typeof sampleDataSchema>
export type SampleListData = SampleData[]

export const sampleCreateSeedDataSchema = object({
	name: string(),
	age: number(),
	bio: string()
})
export type SampleCreateSeedData = Output<typeof sampleCreateSeedDataSchema>

export const sampleListQueryDataSchema = object({
	id: optional(string())
})
export type SampleListQueryData = Output<typeof sampleListQueryDataSchema>
