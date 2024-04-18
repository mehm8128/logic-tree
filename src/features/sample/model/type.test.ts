import { mockSample } from '@/features/sample/mock/data'
import {
	SampleCreateSeed,
	sampleCreateSeedSchema
} from '@/features/sample/model/type'
import { safeParse } from 'valibot'

describe('type', () => {
	describe('sampleCreateSeed', () => {
		test('全て正常なときにvalid', () => {
			expect(safeParse(sampleCreateSeedSchema, mockSample).success).toBe(true)
		})
		test('名前がないときにinvalid', () => {
			const sampleSeed: SampleCreateSeed = {
				name: '',
				age: 21,
				bio: 'sample bio'
			}
			expect(safeParse(sampleCreateSeedSchema, sampleSeed).success).toBe(false)
		})
		test('ageが-1のときにinvalid', () => {
			const sampleSeed: SampleCreateSeed = {
				name: 'sample name',
				age: -1,
				bio: 'sample bio'
			}
			expect(safeParse(sampleCreateSeedSchema, sampleSeed).success).toBe(false)
		})
	})
})
