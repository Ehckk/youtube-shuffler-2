import type { PlaylistItem } from "./PlaylistItem";

interface QueueItem { 
	position: number, 
	item: PlaylistItem 
}

export type { QueueItem }