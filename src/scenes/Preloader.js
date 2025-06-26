export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading North Haven...', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Progress bar fill
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x4CAF50, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        // Load complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Generate sprite textures
        this.generateTextures();
    }

    generateTextures() {
        // We'll create textures programmatically for now
        // Later we can replace with actual sprite files
    }

    create() {
        // Create character sprites
        this.createCharacterSprites();
        
        // Create building textures
        this.createBuildingTextures();
        
        // Create map textures
        this.createMapTextures();
        
        // Start game
        this.scene.start('TitleScene');
    }

    createCharacterSprites() {
        // Create better character sprites
        const characters = [
            { key: 'jaxon', color: 0xFF6B6B },
            { key: 'parker', color: 0xFFEB3B },
            { key: 'vinny', color: 0x4CAF50 },
            { key: 'rocco', color: 0x9C27B0 }
        ];

        characters.forEach(char => {
            const graphics = this.add.graphics();
            
            // Body
            graphics.fillStyle(char.color);
            graphics.fillCircle(16, 12, 12);
            
            // Head
            graphics.fillStyle(0xFFDBB4);
            graphics.fillCircle(16, 8, 8);
            
            // Eyes
            graphics.fillStyle(0x000000);
            graphics.fillCircle(13, 8, 2);
            graphics.fillCircle(19, 8, 2);
            
            // Generate texture
            graphics.generateTexture(char.key, 32, 32);
            graphics.destroy();
        });
    }

    createBuildingTextures() {
        // House texture
        const house = this.add.graphics();
        house.fillStyle(0x8B4513);
        house.fillRect(0, 20, 60, 40);
        house.fillStyle(0xDC143C);
        house.fillTriangle(30, 0, 0, 20, 60, 20);
        house.fillStyle(0x87CEEB);
        house.fillRect(10, 30, 15, 15);
        house.fillRect(35, 30, 15, 15);
        house.fillStyle(0x654321);
        house.fillRect(25, 40, 10, 20);
        house.generateTexture('house', 60, 60);
        house.destroy();

        // School texture
        const school = this.add.graphics();
        school.fillStyle(0xF0E68C);
        school.fillRect(0, 10, 80, 50);
        school.fillStyle(0x8B4513);
        school.fillRect(0, 0, 80, 10);
        school.fillStyle(0x87CEEB);
        for (let i = 0; i < 3; i++) {
            school.fillRect(10 + i * 25, 20, 15, 15);
            school.fillRect(10 + i * 25, 40, 15, 15);
        }
        school.generateTexture('school', 80, 60);
        school.destroy();

        // Park texture
        const park = this.add.graphics();
        park.fillStyle(0x228B22);
        park.fillRect(0, 0, 100, 80);
        park.fillStyle(0x8B4513);
        park.fillRect(20, 30, 5, 20);
        park.fillStyle(0x00FF00);
        park.fillCircle(22, 25, 15);
        park.fillStyle(0xFFFF00);
        park.fillRect(60, 20, 30, 30);
        park.fillStyle(0xFF0000);
        park.fillRect(65, 25, 20, 20);
        park.generateTexture('park', 100, 80);
        park.destroy();

        // Store texture
        const store = this.add.graphics();
        store.fillStyle(0xFFFFFF);
        store.fillRect(0, 0, 70, 50);
        store.fillStyle(0xFF0000);
        store.fillRect(0, 0, 70, 15);
        store.fillStyle(0x000000);
        store.fillRect(20, 25, 30, 20);
        store.generateTexture('store', 70, 50);
        store.destroy();
    }

    createMapTextures() {
        // Road texture
        const road = this.add.graphics();
        road.fillStyle(0x333333);
        road.fillRect(0, 0, 64, 64);
        road.fillStyle(0xFFFF00);
        road.fillRect(30, 0, 4, 20);
        road.fillRect(30, 44, 4, 20);
        road.generateTexture('road', 64, 64);
        road.destroy();

        // Grass texture
        const grass = this.add.graphics();
        grass.fillStyle(0x90EE90);
        grass.fillRect(0, 0, 64, 64);
        grass.generateTexture('grass', 64, 64);
        grass.destroy();
    }
}