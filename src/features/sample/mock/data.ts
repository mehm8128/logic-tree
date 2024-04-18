import { Sample, SampleList, parseId } from '@/features/sample/model/type'

export const mockSample: Sample = {
	id: parseId('sample id'),
	name: 'sample name',
	age: 21,
	bio: 'sample bio'
}

export const mockSampleList: SampleList = [
	{
		id: parseId('sample id1'),
		name: 'sample name1',
		age: 21,
		bio: 'sample bio1'
	},
	{
		id: parseId('sample id2'),
		name: 'sample name2',
		age: 22,
		bio: 'sample bio2'
	},
	{
		id: parseId('sample id3'),
		name: 'sample name3',
		age: 23,
		bio: 'sample bio3'
	}
]
