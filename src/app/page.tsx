'use client'

import AddWord from '@/app/_components/AddWord'
import { Dispatch, SetStateAction, useState } from 'react'
import ContextMenu from './_components/ContextMenu'
import styles from './page.module.css'

export interface Node {
	id: string
	word: string
}

export default function Page() {
	const [openContextMenuId, setOpenContextMenuId] = useState<string | null>(
		null
	)

	return (
		<main>
			<TreeBranch
				openContextMenuId={openContextMenuId}
				setOpenContextMenuId={setOpenContextMenuId}
			/>
		</main>
	)
}

function TreeBranch({
	openContextMenuId,
	setOpenContextMenuId
}: {
	openContextMenuId: string | null
	setOpenContextMenuId: Dispatch<SetStateAction<string | null>>
}) {
	const [children, setChildren] = useState<Node[]>([])
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
	const handleEdit = (i: number, currentChild: Node) => {
		if (editingValue === '') return
		const newChild = {
			...currentChild,
			word: editingValue
		}
		const newChildren = children.with(i, newChild)
		setChildren(newChildren)
		setEditingValue('')
		setOpenContextMenuId(null)
	}
	const handleDelete = (id: string) => {
		const newChildren = children.filter(child => child.id !== id)
		setChildren(newChildren)
		setOpenContextMenuId(null)
	}

	const handleAddChild = (word: string) => {
		const newChild = {
			id: crypto.randomUUID(),
			word,
			children: []
		}
		const newChildren = [...children, newChild]
		setChildren(newChildren)
	}

	const handleAddChild2 = (word: string) => {
		handleAddChild(word)
		setShowCurrentLevelBranch(false)
	}

	return (
		<div
			className={styles.branchRoot}
			onClick={() => setOpenContextMenuId(null)}
			onKeyDown={() => {}}
		>
			{children.length === 0 && (
				<div className={styles.firstInput}>
					<span>----</span>
					<AddWord onAddWord={handleAddChild} />
				</div>
			)}
			{children.map((child, i) => (
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
									handleEdit={() => handleEdit(i, child)}
									handleDelete={handleDelete}
									child={child}
								/>
							)}
						</div>
						<TreeBranch
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
						<AddWord onAddWord={handleAddChild2} />
					</div>
				</div>
			)}
		</div>
	)
}
