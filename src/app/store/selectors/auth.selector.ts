import { AppState } from '../app-state';

export const selectAuthed = (state: AppState) => state.authState;
