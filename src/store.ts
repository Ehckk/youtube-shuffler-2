import type PlayerStates from "youtube-player/dist/constants/PlayerStates";
import type { Writable } from "svelte/store"; 
import { writable } from "svelte/store";
import type { QueueItem } from "./interfaces";

const playlistId: Writable<string | null> = writable(null); // TODO wdf goin on in chicago 💀💀
const playlist: Writable<QueueItem[]> = writable([]);
const current: Writable<QueueItem> = writable(); 
const isPaused: Writable<boolean> = writable(false);
const isLoop: Writable<boolean> = writable(false);

const lockNow: Writable<boolean> = writable(false);
const ignorePrev: Writable<boolean> = writable(false);
const playState: Writable<PlayerStates> = writable(-1);

export { playlistId, playlist, current, isPaused, isLoop, lockNow, ignorePrev, playState }