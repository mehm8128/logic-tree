import {
	Sample,
	SampleCreateSeed,
	SampleCreateSeedData,
	SampleData,
	SampleListQuery,
	SampleListQueryData,
	parseId
} from '@/features/sample/model/type'
import {
	convertSampleCreateSeedToData,
	convertSampleFromData,
	convertSampleListQueryToData
} from './converter'

describe('converter', () => {
	describe('convertSampleListQueryToData', () => {
		test('サーバー用のデータに変換できる', () => {
			const sampleListQuery: SampleListQuery = {
				id: parseId('sample id1')
			}
			const expected: SampleListQueryData = {
				id: 'sample id1'
			}

			expect(convertSampleListQueryToData(sampleListQuery)).toEqual(expected)
		})
	})
	describe('convertSampleFromData', () => {
		test('フロント用のデータに変換できる', () => {
			const sample: SampleData = {
				id: 'sample id1',
				name: 'sample name',
				age: 21,
				bio: 'sample bio'
			}
			const expected: Sample = {
				id: parseId('sample id1'),
				name: 'sample name',
				age: 21,
				bio: 'sample bio'
			}

			expect(convertSampleFromData(sample)).toEqual(expected)
		})
	})
	describe('convertSampleCreateSeedToData', () => {
		test('サーバー用のデータに変換できる', () => {
			const sampleSeed: SampleCreateSeed = {
				name: 'sample name',
				age: 21,
				bio: 'sample bio'
			}
			const expected: SampleCreateSeedData = {
				name: 'sample name',
				age: 21,
				bio: 'sample bio'
			}

			expect(convertSampleCreateSeedToData(sampleSeed)).toEqual(expected)
		})
	})
})
