import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene.js';
import CharacterSelectScene from './scenes/CharacterSelectScene.js';
import MainGameScene from './scenes/MainGameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [TitleScene, CharacterSelectScene, MainGameScene]
};

const game = new Phaser.Game(config);