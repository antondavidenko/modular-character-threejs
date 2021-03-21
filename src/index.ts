import { characterAssetsStorage } from './components/storage/CharacterAssetsStorage';
export { Character } from './components/character/CharacterComponent';
export { characterPresetsStorage } from './components/storage/CharacterPresetsStorage';

export function initStorage(cdnRoot: string): void {
    console.log('initStorage MODULAR is works - update 4');
    characterAssetsStorage.initStorage(cdnRoot);
}
