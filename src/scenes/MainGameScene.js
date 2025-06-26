export default class MainGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainGameScene' });
    }

    init(data) {
        this.selectedCharacter = data.character || 'Jaxon';
    }

    create() {
        // Create the map
        this.createMap();
        
        // Create player
        this.createPlayer();
        
        // Create pets
        this.createPets();
        
        // Create UI
        this.createUI();
        
        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        
        // Camera follow
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.5);
        
        // Mobile controls
        this.createMobileControls();
    }

    createMap() {
        // Create tilemap-style world
        const mapWidth = 2048;
        const mapHeight = 1536;
        
        // Grass background
        for (let x = 0; x < mapWidth; x += 64) {
            for (let y = 0; y < mapHeight; y += 64) {
                this.add.image(x, y, 'grass').setOrigin(0);
            }
        }
        
        // Main roads
        this.createRoad(0, 600, mapWidth, 'horizontal'); // State Street
        this.createRoad(1024, 0, mapHeight, 'vertical'); // Standish Ave
        
        // Additional streets
        this.createRoad(512, 0, mapHeight, 'vertical'); // Maple Ave
        this.createRoad(0, 300, mapWidth, 'horizontal'); // Elm Street
        this.createRoad(0, 900, mapWidth, 'horizontal'); // Washington Ave
        
        // Place buildings
        this.createBuilding(300, 450, 'house', "Jaxon & Parker's House", 'home1');
        this.createBuilding(1200, 750, 'house', "Vinny & Rocco's House", 'home2');
        this.createBuilding(700, 200, 'school', 'Green Acres School', 'school1');
        this.createBuilding(1400, 400, 'school', 'Montowese Elementary', 'school2');
        this.createBuilding(600, 800, 'park', 'Blakeslee Park', 'park');
        this.createBuilding(300, 1000, 'store', 'GameStop', 'gamestop');
        this.createBuilding(800, 1000, 'store', 'Five Below', 'fivebelow');
        this.createBuilding(1300, 1000, 'store', "McDonald's", 'mcdonalds');
        this.createBuilding(200, 200, 'store', 'Stop & Shop', 'grocery');
        
        // Street signs
        this.addStreetSign(100, 580, 'State Street');
        this.addStreetSign(1044, 100, 'Standish Ave');
        this.addStreetSign(532, 100, 'Maple Ave');
        this.addStreetSign(100, 280, 'Elm Street');
        this.addStreetSign(100, 880, 'Washington Ave');
    }

    createRoad(x, y, length, direction) {
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i += 64) {
                this.add.image(x + i, y, 'road').setOrigin(0);
                this.add.image(x + i, y + 64, 'road').setOrigin(0).setRotation(Math.PI);
            }
        } else {
            for (let i = 0; i < length; i += 64) {
                this.add.image(x, y + i, 'road').setOrigin(0).setRotation(Math.PI / 2);
                this.add.image(x + 64, y + i, 'road').setOrigin(0).setRotation(-Math.PI / 2);
            }
        }
    }

    createBuilding(x, y, type, name, id) {
        const building = this.add.image(x, y, type)
            .setInteractive({ useHandCursor: true })
            .setScale(1.5);
        
        const nameplate = this.add.text(x, y + 60, name, {
            fontSize: '14px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 6, y: 4 }
        }).setOrigin(0.5);
        
        building.on('pointerover', () => {
            building.setScale(1.6);
            nameplate.setScale(1.1);
        });
        
        building.on('pointerout', () => {
            building.setScale(1.5);
            nameplate.setScale(1);
        });
        
        building.on('pointerdown', () => {
            this.enterBuilding(id, name);
        });
    }

    addStreetSign(x, y, name) {
        const sign = this.add.rectangle(x, y, 120, 30, 0x006400);
        this.add.text(x, y, name, {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    createPlayer() {
        const startX = this.selectedCharacter === 'Jaxon' || this.selectedCharacter === 'Parker' ? 300 : 1200;
        const startY = this.selectedCharacter === 'Jaxon' || this.selectedCharacter === 'Parker' ? 450 : 750;
        
        this.player = this.physics.add.sprite(startX, startY, this.selectedCharacter.toLowerCase())
            .setScale(2);
        
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(20, 20);
        
        // Player name
        this.playerName = this.add.text(startX, startY - 30, this.selectedCharacter, {
            fontSize: '16px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 4, y: 2 }
        }).setOrigin(0.5);
    }

    createPets() {
        // Pet following the player
        const petOffsetX = -40;
        const petOffsetY = 20;
        
        const petGraphics = this.add.graphics();
        
        // Draw a simple pet (dog for now)
        petGraphics.fillStyle(0x8B4513); // Brown
        petGraphics.fillCircle(0, 0, 12);
        petGraphics.fillCircle(-8, -8, 6); // Ear
        petGraphics.fillCircle(8, -8, 6); // Ear
        petGraphics.generateTexture('pet', 30, 30);
        petGraphics.destroy();
        
        this.pet = this.add.image(this.player.x + petOffsetX, this.player.y + petOffsetY, 'pet')
            .setScale(1.5);
        
        this.petName = this.add.text(this.pet.x, this.pet.y - 20, 'Skittles', {
            fontSize: '12px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 2, y: 1 }
        }).setOrigin(0.5);
    }

    createUI() {
        // Fixed UI elements
        const uiContainer = this.add.container(0, 0);
        
        // Top bar background
        const topBar = this.add.rectangle(512, 40, 1024, 80, 0x000000, 0.8);
        uiContainer.add(topBar);
        
        // Character info
        const charInfo = this.add.text(20, 40, `${this.selectedCharacter}'s Adventure`, {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'Arial Black'
        }).setOrigin(0, 0.5);
        uiContainer.add(charInfo);
        
        // Mini map button
        const mapBtn = this.add.rectangle(950, 40, 120, 40, 0x4CAF50)
            .setInteractive({ useHandCursor: true });
        uiContainer.add(mapBtn);
        
        const mapText = this.add.text(950, 40, 'MAP', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);
        uiContainer.add(mapText);
        
        // Fix UI to camera
        uiContainer.setScrollFactor(0);
    }

    createMobileControls() {
        if (!this.sys.game.device.input.touch) return;
        
        // Virtual joystick area
        const joystickZone = this.add.rectangle(150, this.cameras.main.height - 150, 200, 200, 0x000000, 0.3)
            .setInteractive()
            .setScrollFactor(0);
        
        const joystick = this.add.circle(150, this.cameras.main.height - 150, 50, 0xffffff, 0.5)
            .setScrollFactor(0);
        
        let joystickPressed = false;
        
        joystickZone.on('pointerdown', (pointer) => {
            joystickPressed = true;
        });
        
        this.input.on('pointerup', () => {
            joystickPressed = false;
            joystick.setPosition(150, this.cameras.main.height - 150);
            this.player.body.setVelocity(0);
        });
        
        this.input.on('pointermove', (pointer) => {
            if (joystickPressed) {
                const dx = pointer.x - 150;
                const dy = pointer.y - (this.cameras.main.height - 150);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    joystick.setPosition(pointer.x, pointer.y);
                } else {
                    const angle = Math.atan2(dy, dx);
                    joystick.setPosition(150 + Math.cos(angle) * 100, (this.cameras.main.height - 150) + Math.sin(angle) * 100);
                }
                
                this.player.body.setVelocity(dx * 2, dy * 2);
            }
        });
    }

    enterBuilding(buildingId, buildingName) {
        // Create entrance effect
        const flash = this.add.rectangle(512, 384, 1024, 768, 0xffffff, 0)
            .setScrollFactor(0);
        
        this.tweens.add({
            targets: flash,
            alpha: 1,
            duration: 200,
            yoyo: true,
            onComplete: () => {
                flash.destroy();
                this.showBuildingInterior(buildingId, buildingName);
            }
        });
    }

    showBuildingInterior(buildingId, buildingName) {
        const modal = this.add.container(512, 384);
        
        const bg = this.add.rectangle(0, 0, 800, 600, 0x000000, 0.95);
        modal.add(bg);
        
        const title = this.add.text(0, -250, buildingName, {
            fontSize: '42px',
            color: '#ffffff',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);
        modal.add(title);
        
        // Building-specific content
        let content = '';
        switch(buildingId) {
            case 'home1':
                content = "Welcome home!\nMom left snacks in the kitchen.\nParker is upstairs playing video games.";
                break;
            case 'park':
                content = "The playground is busy today!\nPress SPACE to play on the swings.\nFind 5 hidden treasures around the park!";
                break;
            case 'gamestop':
                content = "New games in stock:\n• Super North Haven Bros\n• Minecraft: Connecticut Edition\n• Angry Birds: Revenge of Jaxon";
                break;
            default:
                content = "This location is coming soon!\nCheck back after the next update.";
        }
        
        const contentText = this.add.text(0, 0, content, {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);
        modal.add(contentText);
        
        const closeBtn = this.add.rectangle(0, 220, 200, 60, 0xff0000)
            .setInteractive({ useHandCursor: true });
        modal.add(closeBtn);
        
        const closeText = this.add.text(0, 220, 'CLOSE', {
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);
        modal.add(closeText);
        
        closeBtn.on('pointerdown', () => modal.destroy(true));
        
        modal.setScrollFactor(0);
    }

    update() {
        // Player movement
        const speed = 200;
        let velocityX = 0;
        let velocityY = 0;
        
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
        }
        
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
        }
        
        this.player.body.setVelocity(velocityX, velocityY);
        
        // Update name position
        this.playerName.setPosition(this.player.x, this.player.y - 30);
        
        // Pet follows player with slight delay
        const petLag = 0.05;
        this.pet.x += (this.player.x - 40 - this.pet.x) * petLag;
        this.pet.y += (this.player.y + 20 - this.pet.y) * petLag;
        this.petName.setPosition(this.pet.x, this.pet.y - 20);
        
        // Boundary checking
        this.player.x = Phaser.Math.Clamp(this.player.x, 0, 2048);
        this.player.y = Phaser.Math.Clamp(this.player.y, 0, 1536);
    }
}