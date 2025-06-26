export default class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectScene' });
        this.selectedCharacter = null;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, 80, 'CHOOSE YOUR CHARACTER', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Character data
        const characters = [
            { name: 'Jaxon', color: 0xFF6B6B, x: centerX - 300, y: centerY - 50, music: 'Angry Birds & Eminem', special: 'Slingshot Master' },
            { name: 'Parker', color: 0xFFEB3B, x: centerX - 100, y: centerY - 50, music: 'SpongeBob Vibes', special: 'Bubble Power' },
            { name: 'Vinny', color: 0x4CAF50, x: centerX + 100, y: centerY - 50, music: 'AC/DC Rock', special: 'Master Builder' },
            { name: 'Rocco', color: 0x9C27B0, x: centerX + 300, y: centerY - 50, music: 'Dino Beats', special: 'Fossil Finder' }
        ];

        // Create character cards
        characters.forEach((char) => {
            // Card background
            const card = this.add.rectangle(char.x, char.y, 180, 240, 0xffffff)
                .setStrokeStyle(4, 0x000000)
                .setInteractive({ useHandCursor: true });

            // Character sprite placeholder
            const sprite = this.add.circle(char.x, char.y - 30, 50, char.color)
                .setStrokeStyle(3, 0x000000);

            // Character name
            this.add.text(char.x, char.y + 50, char.name, {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#000000'
            }).setOrigin(0.5);

            // Special ability
            this.add.text(char.x, char.y + 80, char.special, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#666666'
            }).setOrigin(0.5);

            // Music preference
            this.add.text(char.x, char.y + 100, '♫ ' + char.music, {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: '#999999'
            }).setOrigin(0.5);

            // Selection handling
            card.on('pointerover', () => {
                card.setScale(1.05);
                sprite.setScale(1.05);
            });

            card.on('pointerout', () => {
                if (this.selectedCharacter !== char.name) {
                    card.setScale(1);
                    sprite.setScale(1);
                }
            });

            card.on('pointerdown', () => {
                this.selectedCharacter = char.name;
                // Reset all cards
                this.children.list.forEach(child => {
                    if (child.type === 'Rectangle') {
                        child.setScale(1);
                        child.setStrokeStyle(4, 0x000000);
                    }
                });
                // Highlight selected
                card.setScale(1.1);
                card.setStrokeStyle(6, char.color);
                
                // Enable play button
                if (this.playButton) {
                    this.playButton.setFillStyle(0x4CAF50);
                    this.playText.setColor('#ffffff');
                }
            });
        });

        // Play button (initially disabled)
        this.playButton = this.add.rectangle(centerX, centerY + 200, 250, 60, 0xcccccc)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (this.selectedCharacter) {
                    this.scene.start('MainGameScene', { character: this.selectedCharacter });
                }
            });

        this.playText = this.add.text(centerX, centerY + 200, 'START GAME', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#999999'
        }).setOrigin(0.5);
    }
}