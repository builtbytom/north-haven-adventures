export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainGameScene' });
    }

    init(data) {
        this.selectedCharacter = data.character || 'Jaxon';
    }

    create() {
        // Create North Haven map background
        this.createMap();
        
        // Create player
        this.createPlayer();
        
        // Create UI
        this.createUI();
        
        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mobile touch controls
        this.input.on('pointerdown', this.handleTouch, this);
    }

    createMap() {
        // Sky blue background
        this.cameras.main.setBackgroundColor('#87CEEB');
        
        // Draw roads
        const roads = this.add.graphics();
        roads.lineStyle(40, 0x555555);
        
        // State Street (horizontal)
        roads.lineBetween(0, 300, 1024, 300);
        
        // Standish Ave (vertical)
        roads.lineBetween(512, 0, 512, 768);
        
        // Add street labels
        this.add.text(100, 280, 'State Street', { fontSize: '16px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 4, y: 2 } });
        this.add.text(520, 100, 'Standish Ave', { fontSize: '16px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 4, y: 2 } });
        
        // Create buildings/locations
        this.createLocation(200, 200, 'Jaxon & Parker\'s House', 0x4A90E2);
        this.createLocation(600, 400, 'Vinny & Rocco\'s House', 0x7B68EE);
        this.createLocation(300, 500, 'Blakeslee Park', 0x27AE60);
        this.createLocation(700, 200, 'Green Acres School', 0xE74C3C);
        this.createLocation(200, 600, 'GameStop', 0xF39C12);
        this.createLocation(800, 600, 'Five Below', 0xE91E63);
    }

    createLocation(x, y, name, color) {
        // Building
        const building = this.add.rectangle(x, y, 120, 80, color)
            .setStrokeStyle(3, 0x000000)
            .setInteractive({ useHandCursor: true });
        
        // Label
        const label = this.add.text(x, y + 50, name, {
            fontSize: '14px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5);
        
        // Hover effect
        building.on('pointerover', () => {
            building.setScale(1.1);
            label.setScale(1.1);
        });
        
        building.on('pointerout', () => {
            building.setScale(1);
            label.setScale(1);
        });
        
        building.on('pointerdown', () => {
            this.showLocationInfo(name);
        });
    }

    createPlayer() {
        // Character colors
        const charColors = {
            'Jaxon': 0xFF6B6B,
            'Parker': 0xFFEB3B,
            'Vinny': 0x4CAF50,
            'Rocco': 0x9C27B0
        };
        
        // Create player sprite
        this.player = this.add.circle(200, 200, 20, charColors[this.selectedCharacter])
            .setStrokeStyle(3, 0x000000);
        
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        
        // Player name label
        this.playerLabel = this.add.text(200, 170, this.selectedCharacter, {
            fontSize: '14px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5);
    }

    createUI() {
        // Top bar
        const topBar = this.add.rectangle(512, 30, 1024, 60, 0x000000, 0.7);
        
        // Character info
        this.add.text(20, 30, `Playing as: ${this.selectedCharacter}`, {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);
        
        // Instructions
        this.add.text(this.cameras.main.width - 20, 30, 'Arrow keys or tap to move', {
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(1, 0.5);
    }

    handleTouch(pointer) {
        // Move player towards touch/click position
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            pointer.x, pointer.y
        );
        
        this.player.body.setVelocity(
            Math.cos(angle) * 200,
            Math.sin(angle) * 200
        );
        
        // Stop after a short time
        this.time.delayedCall(500, () => {
            this.player.body.setVelocity(0, 0);
        });
    }

    showLocationInfo(locationName) {
        // Create popup
        const popup = this.add.group();
        
        const bg = this.add.rectangle(512, 384, 600, 400, 0x000000, 0.9);
        popup.add(bg);
        
        const title = this.add.text(512, 250, locationName, {
            fontSize: '36px',
            color: '#ffffff',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);
        popup.add(title);
        
        const info = this.add.text(512, 350, 'Coming soon!\nNew adventures await...', {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        popup.add(info);
        
        const closeBtn = this.add.rectangle(512, 470, 150, 50, 0xff0000)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => popup.destroy(true));
        popup.add(closeBtn);
        
        const closeTxt = this.add.text(512, 470, 'CLOSE', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);
        popup.add(closeTxt);
    }

    update() {
        // Keyboard controls
        const speed = 200;
        
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        } else {
            this.player.body.setVelocityX(0);
        }
        
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        } else {
            this.player.body.setVelocityY(0);
        }
        
        // Update player label position
        this.playerLabel.setPosition(this.player.x, this.player.y - 30);
    }
}