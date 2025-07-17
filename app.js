// FridgeChef PWA - AI-powered recipe suggestions from fridge contents

class FridgeChefApp {
    constructor() {
        this.camera = document.getElementById('camera');
        this.canvas = document.getElementById('canvas');
        this.capturedImage = document.getElementById('capturedImage');
        this.loading = document.getElementById('loading');
        this.loadingText = document.getElementById('loadingText');
        
        // Camera controls
        this.startCameraBtn = document.getElementById('startCamera');
        this.capturePhotoBtn = document.getElementById('capturePhoto');
        this.retakePhotoBtn = document.getElementById('retakePhoto');
        this.uploadPhotoBtn = document.getElementById('uploadPhoto');
        this.fileInput = document.getElementById('fileInput');
        
        // Sections
        this.analysisSection = document.getElementById('analysisSection');
        this.recipesSection = document.getElementById('recipesSection');
        this.ingredientsList = document.getElementById('ingredientsList');
        this.recipesList = document.getElementById('recipesList');
        this.getRecipesBtn = document.getElementById('getRecipes');
        
        this.stream = null;
        this.detectedIngredients = [];
        
        this.init();
    }
    
    init() {
        // Register service worker
        this.registerServiceWorker();
        
        // Event listeners
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.capturePhotoBtn.addEventListener('click', () => this.capturePhoto());
        this.retakePhotoBtn.addEventListener('click', () => this.retakePhoto());
        this.uploadPhotoBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.getRecipesBtn.addEventListener('click', () => this.getRecipes());
    }
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./sw.js');
                console.log('Service Worker registered successfully');
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
    
    async startCamera() {
        try {
            this.showLoading('Starting camera...');
            
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    facingMode: 'environment', // Use back camera
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            this.camera.srcObject = this.stream;
            this.camera.classList.remove('hidden');
            this.startCameraBtn.classList.add('hidden');
            this.capturePhotoBtn.classList.remove('hidden');
            
            this.hideLoading();
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.hideLoading();
            alert('Unable to access camera. Please try uploading a photo instead.');
        }
    }
    
    capturePhoto() {
        const context = this.canvas.getContext('2d');
        this.canvas.width = this.camera.videoWidth;
        this.canvas.height = this.camera.videoHeight;
        
        context.drawImage(this.camera, 0, 0);
        
        // Convert to blob and display
        this.canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            this.capturedImage.src = url;
            this.showCapturedPhoto();
            this.analyzeImage(blob);
        }, 'image/jpeg', 0.8);
    }
    
    showCapturedPhoto() {
        this.camera.classList.add('hidden');
        this.capturedImage.parentElement.classList.remove('hidden');
        this.capturePhotoBtn.classList.add('hidden');
        this.retakePhotoBtn.classList.remove('hidden');
        
        // Stop camera stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
    
    retakePhoto() {
        this.capturedImage.parentElement.classList.add('hidden');
        this.retakePhotoBtn.classList.add('hidden');
        this.startCameraBtn.classList.remove('hidden');
        this.analysisSection.classList.add('hidden');
        this.recipesSection.classList.add('hidden');
        this.detectedIngredients = [];
    }
    
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            this.capturedImage.src = url;
            this.capturedImage.parentElement.classList.remove('hidden');
            this.startCameraBtn.classList.add('hidden');
            this.uploadPhotoBtn.classList.add('hidden');
            this.retakePhotoBtn.classList.remove('hidden');
            this.analyzeImage(file);
        }
    }
    
    async analyzeImage(imageBlob) {
        this.showLoading('Analyzing your fridge contents...');
        
        try {
            // Convert image to base64 for analysis
            const base64 = await this.blobToBase64(imageBlob);
            
            // Simulate AI analysis (in a real app, you would call an AI service like Google Vision API, AWS Rekognition, or OpenAI Vision)
            await this.simulateAIAnalysis(base64);
            
        } catch (error) {
            console.error('Error analyzing image:', error);
            this.hideLoading();
            alert('Error analyzing image. Please try again.');
        }
    }
    
    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    
    async simulateAIAnalysis(base64Image) {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock detected ingredients (in real app, this would come from AI service)
        const mockIngredients = [
            'Eggs', 'Milk', 'Cheese', 'Tomatoes', 'Onions', 
            'Bell Peppers', 'Lettuce', 'Carrots', 'Chicken', 
            'Bread', 'Butter', 'Garlic', 'Potatoes'
        ];
        
        // Randomly select 5-8 ingredients
        const numIngredients = Math.floor(Math.random() * 4) + 5;
        this.detectedIngredients = this.shuffleArray(mockIngredients)
            .slice(0, numIngredients);
        
        this.displayIngredients();
        this.hideLoading();
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    displayIngredients() {
        this.ingredientsList.innerHTML = '';
        
        if (this.detectedIngredients.length === 0) {
            this.ingredientsList.innerHTML = '<p>No ingredients detected. Try a clearer photo.</p>';
        } else {
            this.detectedIngredients.forEach((ingredient, index) => {
                const tag = document.createElement('div');
                tag.className = 'ingredient-tag removable';
                tag.textContent = ingredient;
                tag.addEventListener('click', () => this.removeIngredient(index));
                this.ingredientsList.appendChild(tag);
            });
        }
        
        this.analysisSection.classList.remove('hidden');
    }
    
    removeIngredient(index) {
        this.detectedIngredients.splice(index, 1);
        this.displayIngredients();
    }
    
    async getRecipes() {
        if (this.detectedIngredients.length === 0) {
            alert('No ingredients detected. Please take another photo.');
            return;
        }
        
        this.showLoading('Finding delicious recipes...');
        
        try {
            // Simulate recipe API call
            const recipes = await this.generateRecipes(this.detectedIngredients);
            this.displayRecipes(recipes);
            this.hideLoading();
            
            // Scroll to recipes section
            this.recipesSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error getting recipes:', error);
            this.hideLoading();
            alert('Error getting recipes. Please try again.');
        }
    }
    
    async generateRecipes(ingredients) {
        // Simulate API processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock recipe data (in real app, this would come from a recipe API)
        const recipeTemplates = [
            {
                name: "Quick Vegetable Stir Fry",
                time: "15 minutes",
                mainIngredients: ["bell peppers", "onions", "carrots", "garlic"],
                instructions: "Heat oil in a pan, add garlic and onions, then add vegetables and stir fry for 5-7 minutes."
            },
            {
                name: "Cheese Omelet",
                time: "10 minutes", 
                mainIngredients: ["eggs", "cheese", "butter"],
                instructions: "Beat eggs, melt butter in pan, pour eggs and add cheese. Fold and serve."
            },
            {
                name: "Chicken Salad",
                time: "20 minutes",
                mainIngredients: ["chicken", "lettuce", "tomatoes", "onions"],
                instructions: "Cook chicken, let cool, then mix with chopped vegetables and dressing."
            },
            {
                name: "Roasted Vegetables",
                time: "30 minutes",
                mainIngredients: ["potatoes", "carrots", "bell peppers", "onions"],
                instructions: "Cut vegetables, toss with oil and seasonings, roast at 400°F for 25-30 minutes."
            },
            {
                name: "Garlic Butter Vegetables",
                time: "12 minutes",
                mainIngredients: ["garlic", "butter", "bell peppers", "onions"],
                instructions: "Melt butter, add garlic, then vegetables. Sauté until tender."
            }
        ];
        
        // Filter recipes based on available ingredients
        const availableRecipes = recipeTemplates.filter(recipe => 
            recipe.mainIngredients.some(ingredient => 
                ingredients.some(userIngredient => 
                    userIngredient.toLowerCase().includes(ingredient.toLowerCase()) ||
                    ingredient.toLowerCase().includes(userIngredient.toLowerCase())
                )
            )
        );
        
        // Return top 3 recipes or all if less than 3
        return availableRecipes.slice(0, 3);
    }
    
    displayRecipes(recipes) {
        this.recipesList.innerHTML = '';
        
        if (recipes.length === 0) {
            this.recipesList.innerHTML = '<p>No recipes found with your ingredients. Try adding more ingredients!</p>';
        } else {
            recipes.forEach(recipe => {
                const recipeCard = this.createRecipeCard(recipe);
                this.recipesList.appendChild(recipeCard);
            });
        }
        
        this.recipesSection.classList.remove('hidden');
    }
    
    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        // Create ingredients list based on what user has
        const availableIngredients = recipe.mainIngredients.filter(ingredient =>
            this.detectedIngredients.some(userIngredient =>
                userIngredient.toLowerCase().includes(ingredient.toLowerCase()) ||
                ingredient.toLowerCase().includes(userIngredient.toLowerCase())
            )
        );
        
        card.innerHTML = `
            <div class="recipe-title">${recipe.name}</div>
            <div class="recipe-time">⏱️ ${recipe.time}</div>
            <div class="recipe-ingredients">
                <h4>Available Ingredients:</h4>
                <ul>
                    ${availableIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="recipe-instructions">
                <h4>Quick Instructions:</h4>
                <p>${recipe.instructions}</p>
            </div>
        `;
        
        return card;
    }
    
    showLoading(message = 'Loading...') {
        this.loadingText.textContent = message;
        this.loading.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loading.classList.add('hidden');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FridgeChefApp();
});