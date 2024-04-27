import { useState } from 'react'
import styles from './AddWord.module.css'

export default function AddWord({
	onAddWord
}: {
	onAddWord: (word: string) => void
}) {
	const [value, setValue] = useState<string>('')

	const settleWord = (word: string) => {
		if (word === '') return
		onAddWord(word)
		setValue('')
	}

	return (
		<div className={styles.addWord}>
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				// biome-ignore lint/a11y/noAutofocus: 今回は許容
				autoFocus
				className={styles.input}
			/>
			<button
				onClick={() => settleWord(value)}
				type="button"
				className={styles.button}
			>
				Add
			</button>
		</div>
	)
}
