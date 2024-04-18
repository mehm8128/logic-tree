import { mockSampleList } from '@/features/sample/mock/data'
import { getSampleIds } from '@/features/sample/model/selector'

describe('selector', () => {
	describe('getSampleIds', () => {
		test('idの一覧を取得できる', () => {
			const expected = ['sample id1', 'sample id2', 'sample id3']
			expect(getSampleIds(mockSampleList)).toEqual(expected)
		})
	})
})
