import { PlaylistErrors } from "../interfaces"

const formatErrorMessage = (error: PlaylistErrors): string[] => {
	switch (error) {
		case PlaylistErrors.BlankQuery:
			return ['Please specify a playlist id!']
		case PlaylistErrors.InvalidQuery:
			return [`Could not find the specified playlist`, `Make sure the playlist is "Unlisted" or "Public"`]
		case PlaylistErrors.Internal:
			return [`An internal error has occured`, `Please try again later 🐷`]
	}	
}

export { formatErrorMessage }