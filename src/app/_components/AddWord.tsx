import { Tree, searchTree } from '@/app/page'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from './AddWord.module.css'

export default function AddWord({
	tree,
	setTree
}: { tree: Tree; setTree: Dispatch<SetStateAction<Tree>> }) {
	const [value, setValue] = useState<string>('')

	const addWord = (word: string, id: string) => {
		if (word === '') return
		setTree(prev => {
			const newTree = structuredClone(prev)
			// tree.idがidのところだけwordを更新する
			const tree = searchTree(newTree, id)
			if (!tree) return prev
			tree.children.push({
				id: crypto.randomUUID(),
				word,
				children: []
			})
			return { ...newTree }
		})
	}

	const settleWord = (word: string) => {
		addWord(word, tree.id)
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
