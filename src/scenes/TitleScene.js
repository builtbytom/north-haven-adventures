export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // Load any title screen assets
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, centerY - 150, 'NORTH HAVEN', {
            fontSize: '72px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 70, 'ADVENTURES', {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Play button
        const playButton = this.add.rectangle(centerX, centerY + 50, 300, 80, 0x4CAF50)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => playButton.setFillStyle(0x66BB6A))
            .on('pointerout', () => playButton.setFillStyle(0x4CAF50))
            .on('pointerdown', () => {
                this.scene.start('CharacterSelectScene');
            });

        this.add.text(centerX, centerY + 50, 'START ADVENTURE', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Credits
        this.add.text(centerX, this.cameras.main.height - 30, 'Made with ❤️ by Dad for Jaxon, Parker, Vinny & Rocco', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);
    }
}