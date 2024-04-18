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
	const [showCurrentLevelBranch, setShowCurrentLevelBranch] = useState(false)
	const addCurrentLevelBranch = () => {
		setShowCurrentLevelBranch(!showCurrentLevelBranch)
	}

	const handleSetTree = (newTree: SetStateAction<Tree>) => {
		setTree(newTree)
		setShowCurrentLevelBranch(false)
	}

	return (
		<div className={styles.branchRoot}>
			{tree.children.length === 0 && (
				<div className={styles.firstInput}>
					<span>----</span>
					<AddWord tree={tree} setTree={setTree} />
				</div>
			)}
			{tree.children.map((child, i) => (
				<>
					{i !== 0 && <div className={styles.divider}>|</div>}
					<div
						key={child.id}
						className={styles.branchChild}
						data-notfirst={i !== 0}
					>
						--
						{i === 0 && '--'}
						<div className={styles.wordButtonContainer}>
							<button
								onClick={addCurrentLevelBranch}
								type="button"
								className={styles.wordButton}
							>
								{child.word}
							</button>
						</div>
						<TreeBranch tree={child} setTree={setTree} />
					</div>
				</>
			))}
			{showCurrentLevelBranch && (
				<div className={styles.branchLastChild}>
					<div>|</div>
					<div className={styles.branchChild}>
						---
						<AddWord tree={tree} setTree={handleSetTree} />
					</div>
				</div>
			)}
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
				className={styles.input}
			/>
			<button
				onClick={() => settleWord(value)}
				type="button"
				className={styles.addButton}
			>
				Add
			</button>
		</div>
	)
}
