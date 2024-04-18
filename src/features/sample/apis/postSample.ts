import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { Sample, SampleCreateSeed, SampleData } from '../model/type'
import {
	convertSampleCreateSeedToData,
	convertSampleFromData
} from './converter'

export const postSample = async (seed: SampleCreateSeed): Promise<Sample> => {
	const seedData = convertSampleCreateSeedToData(seed)
	const res: SampleData = await fetcher(`${getApiOrigin()}/samples`, {
		method: 'POST',
		body: JSON.stringify(seedData)
	})

	return convertSampleFromData(res)
}
