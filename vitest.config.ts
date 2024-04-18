/* eslint @typescript-eslint/no-unsafe-call: 0 */
/// <reference types="vitest" />

import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src').replace(/\\/g, '/'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./setup.ts'],
	},
})
