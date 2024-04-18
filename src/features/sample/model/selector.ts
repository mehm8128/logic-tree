import { SampleId, SampleList } from './type'

export const getSampleIds = (sampleList: SampleList): SampleId[] =>
	sampleList.map(sample => sample.id)
