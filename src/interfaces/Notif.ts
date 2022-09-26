import type { NotifType } from "./NotifType"

interface Notif {
	type: NotifType
	message: string
	info?: string
	id: number
	duration?: number
}

export type { Notif }