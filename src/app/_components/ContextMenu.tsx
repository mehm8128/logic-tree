import { Tree } from '@/app/page'
import { Dispatch, SetStateAction } from 'react'
import styles from './ContextMenu.module.css'

export default function ContextMenu({
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
				// biome-ignore lint/a11y/noAutofocus: 今回は許容
				autoFocus
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
