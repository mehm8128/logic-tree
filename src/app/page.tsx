'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import styles from './page.module.css'

interface Tree {
	id: string
	word: string
	children: Tree[]
}

const searchTree = (tree: Tree, id: string, parent = false): Tree | null => {
	if (parent) {
		if (tree.children.some(child => child.id === id)) return tree
	} else {
		if (tree.id === id) return tree
	}
	for (const child of tree.children) {
		const result = searchTree(child, id, parent)
		if (result) return result
	}
	return null
}

export default function Page() {
	const [tree, setTree] = useState<Tree>({
		id: 'root',
		word: '',
		children: []
	})
	const [openContextMenuId, setOpenContextMenuId] = useState<string | null>(null)

	return (
		<main className={styles.main}>
			<AddWord tree={tree} setTree={setTree} />
			<div>
				<TreeBranch
					tree={tree}
					setTree={setTree}
					openContextMenuId={openContextMenuId}
					setOpenContextMenuId={setOpenContextMenuId}
				/>
			</div>
			{JSON.stringify(tree)}
		</main>
	)
}

function TreeBranch({
	tree,
	setTree,
	openContextMenuId,
	setOpenContextMenuId
}: {
	tree: Tree
	setTree: Dispatch<SetStateAction<Tree>>
	openContextMenuId: string | null
	setOpenContextMenuId: Dispatch<SetStateAction<string | null>>
}) {
	const [showCurrentLevelBranch, setShowCurrentLevelBranch] = useState(false)

	const [editingValue, setEditingValue] = useState<string>('')
	const addCurrentLevelBranch = () => {
		setShowCurrentLevelBranch(!showCurrentLevelBranch)
	}

	const handleOpenContextMenu = (
		e: React.MouseEvent<HTMLButtonElement>,
		id: string
	) => {
		e.preventDefault()
		setOpenContextMenuId(id)
	}
	const handleEdit = (id: string) => {
		if (editingValue === '') return
		setTree(prev => {
			const newTree = structuredClone(prev)
			const tree = searchTree(newTree, id)
			if (!tree) return prev
			tree.word = editingValue
			return { ...newTree }
		})
		setEditingValue('')
		setOpenContextMenuId(null)
	}
	const handleDelete = (id: string) => {
		setTree(prev => {
			const newTree = structuredClone(prev)
			const parent = searchTree(newTree, id, true)
			if (!parent) return prev
			parent.children = parent.children.filter(child => child.id !== id)
			return { ...newTree }
		})
		setOpenContextMenuId(null)
	}

	const handleSetTree = (newTree: SetStateAction<Tree>) => {
		setTree(newTree)
		setShowCurrentLevelBranch(false)
	}

	return (
		<div
			className={styles.branchRoot}
			onClick={() => setOpenContextMenuId(null)}
			onKeyDown={() => {}}
		>
			{tree.children.length === 0 && (
				<div className={styles.firstInput}>
					<span>----</span>
					<AddWord tree={tree} setTree={setTree} />
				</div>
			)}
			{tree.children.map((child, i) => (
				<div key={child.id}>
					{i !== 0 && <div className={styles.divider}>|</div>}
					<div className={styles.branchChild} data-notfirst={i !== 0}>
						--
						{i === 0 && '--'}
						<div className={styles.wordButtonContainer}>
							<button
								onClick={addCurrentLevelBranch}
								onContextMenu={e => handleOpenContextMenu(e, child.id)}
								type="button"
								className={styles.wordButton}
							>
								{child.word}
							</button>
							{openContextMenuId === child.id && (
								<ContextMenu
									editingValue={editingValue}
									setEditingValue={setEditingValue}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
									child={child}
								/>
							)}
						</div>
						<TreeBranch
							tree={child}
							setTree={setTree}
							openContextMenuId={openContextMenuId}
							setOpenContextMenuId={setOpenContextMenuId}
						/>
					</div>
				</div>
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

function ContextMenu({
	editingValue,
	setEditingValue,
	handleEdit,
	handleDelete,
	child
}: {
	editingValue: string
	setEditingValue: Dispatch<SetStateAction<string>>
	handleEdit: (id: string) => void
	handleDelete: (id: string) => void
	child: Tree
}) {
	return (
		<div
			className={styles.contextMenu}
			onClick={e => e.stopPropagation()}
			onKeyDown={() => {}}
		>
			<input
				onChange={e => setEditingValue(e.target.value)}
				value={editingValue}
				className={styles.input}
			/>
			<button
				onClick={() => handleEdit(child.id)}
				type="button"
				className={styles.button}
			>
				修正
			</button>
			<button
				onClick={() => handleDelete(child.id)}
				type="button"
				className={styles.button}
			>
				削除
			</button>
		</div>
	)
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
				className={styles.button}
			>
				Add
			</button>
		</div>
	)
}
