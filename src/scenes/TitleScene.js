export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Animated background
        this.createAnimatedBackground();

        // Main title with gradient effect
        const titleContainer = this.add.container(centerX, centerY - 100);
        
        // Title shadow
        this.add.text(3, 3, 'NORTH HAVEN', {
            fontSize: '84px',
            fontFamily: 'Arial Black',
            color: '#000000',
            alpha: 0.3
        }).setOrigin(0.5);
        
        // Main title
        const title1 = this.add.text(0, 0, 'NORTH HAVEN', {
            fontSize: '84px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#2C3E50',
            strokeThickness: 8
        }).setOrigin(0.5);
        titleContainer.add(title1);

        const title2 = this.add.text(0, 80, 'ADVENTURES', {
            fontSize: '72px',
            fontFamily: 'Arial Black',
            color: '#FFD700',
            stroke: '#FF6B6B',
            strokeThickness: 8
        }).setOrigin(0.5);
        titleContainer.add(title2);

        // Floating animation
        this.tweens.add({
            targets: titleContainer,
            y: centerY - 90,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Character previews
        this.createCharacterPreviews();

        // Play button with hover effect
        const playButton = this.add.graphics();
        playButton.fillStyle(0x4CAF50, 1);
        playButton.fillRoundedRect(centerX - 150, centerY + 100, 300, 80, 20);
        
        const buttonHitArea = new Phaser.Geom.Rectangle(centerX - 150, centerY + 100, 300, 80);
        playButton.setInteractive(buttonHitArea, Phaser.Geom.Rectangle.Contains);

        const playText = this.add.text(centerX, centerY + 140, 'START ADVENTURE', {
            fontSize: '36px',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Hover effects
        playButton.on('pointerover', () => {
            playButton.clear();
            playButton.fillStyle(0x66BB6A, 1);
            playButton.fillRoundedRect(centerX - 160, centerY + 95, 320, 90, 20);
            playText.setScale(1.1);
        });

        playButton.on('pointerout', () => {
            playButton.clear();
            playButton.fillStyle(0x4CAF50, 1);
            playButton.fillRoundedRect(centerX - 150, centerY + 100, 300, 80, 20);
            playText.setScale(1);
        });

        playButton.on('pointerdown', () => {
            // Click effect
            this.cameras.main.flash(250);
            this.time.delayedCall(250, () => {
                this.scene.start('CharacterSelectScene');
            });
        });

        // Version info
        this.add.text(10, this.cameras.main.height - 30, 'v1.0 - Summer 2025 Edition', {
            fontSize: '16px',
            color: '#ffffff',
            alpha: 0.7
        });

        // Credits with heart animation
        const credits = this.add.text(centerX, this.cameras.main.height - 30, 
            'Made with ❤️ by Dad for Jaxon, Parker, Vinny & Rocco', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Heart beat animation
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.tweens.add({
                    targets: credits,
                    scale: 1.05,
                    duration: 200,
                    yoyo: true
                });
            },
            loop: true
        });
    }

    createAnimatedBackground() {
        // Create gradient background
        const bg = this.add.graphics();
        const colors = [0x87CEEB, 0x98D8C8];
        const height = this.cameras.main.height;
        
        for (let i = 0; i < height; i++) {
            const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                Phaser.Display.Color.ValueToColor(colors[0]),
                Phaser.Display.Color.ValueToColor(colors[1]),
                height,
                i
            );
            bg.fillStyle(color.color);
            bg.fillRect(0, i, this.cameras.main.width, 1);
        }

        // Add floating clouds
        for (let i = 0; i < 5; i++) {
            const cloud = this.add.circle(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(50, 200),
                Phaser.Math.Between(30, 60),
                0xffffff,
                0.3
            );
            
            this.tweens.add({
                targets: cloud,
                x: this.cameras.main.width + 100,
                duration: Phaser.Math.Between(20000, 40000),
                repeat: -1,
                onRepeat: () => {
                    cloud.x = -100;
                    cloud.y = Phaser.Math.Between(50, 200);
                }
            });
        }
    }

    createCharacterPreviews() {
        const characters = [
            { name: 'Jaxon', x: 200, color: 0xFF6B6B },
            { name: 'Parker', x: 400, color: 0xFFEB3B },
            { name: 'Vinny', x: 600, color: 0x4CAF50 },
            { name: 'Rocco', x: 800, color: 0x9C27B0 }
        ];

        characters.forEach((char, index) => {
            const preview = this.add.circle(char.x, 400, 25, char.color)
                .setStrokeStyle(3, 0x000000);
            
            // Bounce animation with delay
            this.time.delayedCall(index * 200, () => {
                this.tweens.add({
                    targets: preview,
                    y: 380,
                    duration: 1000,
                    ease: 'Bounce.easeOut',
                    yoyo: true,
                    repeat: -1,
                    delay: index * 100
                });
            });
            
            // Name
            this.add.text(char.x, 440, char.name, {
                fontSize: '18px',
                color: '#ffffff',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
        });
    }
}