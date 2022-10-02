interface VolumeControl {
	get: () => Promise<number>
	set: (volume: number) => Promise<void>
}

export type { VolumeControl }