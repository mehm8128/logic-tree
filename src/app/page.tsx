'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import styles from './page.module.css'

interface Tree {
	id: string
	word: string
	children: Tree[]
}

export default function Page() {
	const [tree, setTree] = useState<Tree>({
		id: 'root',
		word: '',
		children: []
	})

	return (
		<main>
			<AddWord tree={tree} setTree={setTree} />
			<div>
				<TreeBranch tree={tree} setTree={setTree} />
			</div>
		</main>
	)
}

function TreeBranch({
	tree,
	setTree
}: { tree: Tree; setTree: Dispatch<SetStateAction<Tree>> }) {
	return (
		<div className={styles.branchRoot}>
			{tree.children.map((child, i) => (
				<>
					{i !== 0 && (
						<div>
							<div>|</div>
						</div>
					)}
					<div key={child.id} className={styles.branchChild}>
						----
						<div className={styles.word}>
							{child.word}
							<AddWord tree={child} setTree={setTree} />
						</div>
						<TreeBranch tree={child} setTree={setTree} />
					</div>
				</>
			))}
		</div>
	)
}

const searchTree = (tree: Tree, id: string): Tree | null => {
	if (tree.id === id) return tree
	for (const child of tree.children) {
		const result = searchTree(child, id)
		if (result) return result
	}
	return null
}

function AddWord({
	tree,
	setTree
}: { tree: Tree; setTree: Dispatch<SetStateAction<Tree>> }) {
	const [value, setValue] = useState<string>('')
	const [open, setOpen] = useState<boolean>(tree.children.length === 0)

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
		setOpen(false)
	}

	if (!open) {
		return (
			<button onClick={() => setOpen(!open)} type="button">
				add
			</button>
		)
	}

	return (
		<div>
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				style={{
					width: 100
				}}
			/>
			<button onClick={() => settleWord(value)} type="button">
				Add
			</button>
		</div>
	)
}
