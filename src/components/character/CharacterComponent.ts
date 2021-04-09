import * as THREE from 'three';
import { loadFBX } from '../utils/loadFBX';
import { CharacterConfig } from './model/CharacterConfig';
import { CharacterSlots } from './controls/CharacterSlots';
import { CharacterAnimation } from './controls/CharacterAnimation';
import { setupBodyTexture, setupBodyType } from './utils/setupBody';
import { BodyType } from './model/BodyType';
import { CDN_ROOT } from '../storage/utils/loadFilesList';

const headId = "RigHead";
const mainId = "RigPelvis";

export class Character {

    private characterGroup: THREE.Group;
    private isReady = false;
    private head: THREE.Object3D;

    private characterSlots: CharacterSlots;
    private characterAnimation: CharacterAnimation = new CharacterAnimation();

    constructor(private scene: THREE.Scene, private config: CharacterConfig, private animationFileId: string, callback: () => void) {
        this.characterSlots = new CharacterSlots(this.config);
        this.init(callback);
    }

    private async init(callback?: () => void) {
        await this.setupAll(callback);
        this.scene.add(this.characterGroup);
    }

    async reInit() {
        this.scene.remove(this.characterGroup);
        this.init();
    }

    private async setupAll(callback?: () => void) {
        this.characterGroup = await loadFBX("models/"+this.config.baseFBX+".FBX", CDN_ROOT);
        this.head = this.characterGroup.getObjectByName(headId);
        this.characterSlots.setCharacterGroup(this.characterGroup);

        this.setupBodyType();
        this.setupBodyTexture();
        this.characterSlots.setupHead(this.config);
        this.setupCarryItemSlot("rightHandSlot", this.config.rightHandSlot);
        this.setupCarryItemSlot("leftHandSlot", this.config.leftHandSlot);
        this.setupCarryItemSlot("backSlot", this.config.backSlot);

        this.characterAnimation.init(this.characterGroup, this.animationFileId);
        if (callback) {
            callback();
            this.isReady = true;
        }
    }

    getIsReady(): boolean {
        return this.isReady;
    }

    update() {
        if (this.characterAnimation.update()) {
            this.setupBodyType();
        }
    }

   resetBodyType(bodyType: BodyType) {
        this.config.bodyType = bodyType;
    }

    private setupBodyType() {
        setupBodyType(this.characterGroup, this.head, this.config);
    }

    async setupHair(hairFBX: string, color = '#ffffff') {
        this.characterSlots.setupHead(this.config);
    }

    setupHat(hatFBX: string) {
        this.characterSlots.setupHead(this.config);
    }

    headDecor1(decorFBX: string) {
        this.characterSlots.setupHead(this.config);
    }

    headDecor2(decorFBX: string) {
        this.characterSlots.setupHead(this.config);
    }

    setupBodyTexture() {
        setupBodyTexture(this.characterGroup, this.config);
    }

    setupCarryItemSlot(slotId: string, carryItemsFBX: string) {
        this.characterSlots.setupCarryItemSlot(slotId, carryItemsFBX);
    }

    getConfig(): CharacterConfig {
        return this.config;
    }

    setConfig(config: CharacterConfig): void {
        this.config = config;
        this.reInit();
    }

    resetAnimation(animationFileId:string) {
        this.animationFileId = animationFileId;
        this.characterAnimation.resetAnimation(animationFileId);
    }

    get position(): THREE.Vector3 {
        return this.characterGroup.position;
    }

    set position(value: THREE.Vector3) {
        this.characterGroup.position.set(value.x, value.y, value.z);
    }

    get rotation(): THREE.Euler {
        return this.characterGroup.rotation;
    }

    set rotation(value: THREE.Euler) {
        this.characterGroup.rotation.set(value.x, value.y, value.z);
    }

}