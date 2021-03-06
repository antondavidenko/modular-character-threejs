import { characterAssetsStorage } from './components/storage/CharacterAssetsStorage';
export { Character } from './components/character/CharacterComponent';
export { characterPresetsStorage } from './components/storage/CharacterPresetsStorage';

export function initStorage(cdnRoot: string, callback: () => void): void {
    characterAssetsStorage.initStorage(cdnRoot, callback);
}
