import { useCallback } from 'react'

export const useRandomId = (length: number = 8) => {
	const generateRandomId = useCallback(() => {
		const chars = 'abcdefghijklmnopqrstuvwxyz01234567890123456789'
		let result = ''
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return result
	}, [length])

	return generateRandomId
}

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
