# 🍽️ FridgeChef - AI Recipe Suggestions PWA

FridgeChef is a Progressive Web App (PWA) that uses AI to analyze photos of your fridge and suggest delicious recipes based on the ingredients you have available. Simply take a photo of your fridge contents, let our AI detect the ingredients, and get personalized recipe suggestions instantly!

## ✨ Features

- 📷 **Camera Integration**: Take photos directly with your device's camera
- 📁 **Photo Upload**: Upload existing photos from your gallery
- 🤖 **AI-Powered Analysis**: Automatic ingredient detection from fridge photos
- 🍳 **Smart Recipe Suggestions**: Get recipes based on available ingredients
- 📱 **Mobile-First Design**: Optimized for smartphones and tablets
- 🔄 **Offline Support**: Works even without internet connection
- ⚡ **PWA Features**: Install on your device like a native app

## 🚀 How to Use

1. **Open the App**: Visit FridgeChef in your browser
2. **Take a Photo**: Use the camera or upload a photo of your fridge
3. **Review Ingredients**: See what ingredients our AI detected
4. **Get Recipes**: Tap "Get Recipe Suggestions" to see what you can cook
5. **Start Cooking**: Choose a recipe and start preparing your meal!

## 📱 Installation

### On Mobile (iOS/Android)
1. Open FridgeChef in Safari (iOS) or Chrome (Android)
2. Tap the "Add to Home Screen" option in your browser menu
3. Confirm the installation
4. The app icon will appear on your home screen

### On Desktop
1. Open FridgeChef in Chrome, Edge, or Firefox
2. Look for the install icon in the address bar
3. Click "Install" to add it to your desktop

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **PWA Features**: Service Worker, Web App Manifest
- **Camera API**: getUserMedia for camera access
- **File API**: For photo uploads
- **Responsive Design**: Mobile-first CSS with Flexbox/Grid

## 🔧 Development

### Prerequisites
- Modern web browser with camera support
- Local web server (for development)

### Setup
1. Clone the repository
2. Start a local web server in the project directory
3. Open the app in your browser
4. Grant camera permissions when prompted

### File Structure
```
fridgechef/
├── index.html          # Main HTML file
├── app.js              # Application logic
├── style.css           # Styling
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
└── README.md          # This file
```

## 🎯 Real-World Implementation

While this demo uses simulated AI analysis, a production version would integrate with:

- **Google Vision API** - For image recognition
- **AWS Rekognition** - For ingredient detection
- **OpenAI Vision** - For advanced image understanding
- **Recipe APIs** - Like Spoonacular, Edamam, or TheMealDB
- **Custom ML Models** - Trained specifically for food recognition

## 📸 Screenshots

The app features:
- Clean, modern interface with green/emerald theme
- Camera preview with intuitive controls
- Ingredient tags with easy removal
- Recipe cards with cooking times and instructions
- Loading animations and smooth transitions

## 🔮 Future Enhancements

- **Real AI Integration**: Connect to actual vision APIs
- **Recipe Database**: Larger recipe collection
- **Dietary Filters**: Vegetarian, vegan, gluten-free options
- **Shopping Lists**: Generate lists for missing ingredients
- **Meal Planning**: Weekly meal suggestions
- **User Profiles**: Save favorites and dietary preferences
- **Social Features**: Share recipes with friends
- **Nutritional Info**: Calorie and nutrition tracking

## 🌟 Contributing

This is a demo PWA showcasing modern web technologies. Contributions for improvements and real AI integration are welcome!

## 📄 License

This project is open source and available under the MIT License.

---

**Note**: This is a demonstration app. The AI ingredient detection is simulated with mock data. For a production app, you would need to integrate with actual computer vision services for real ingredient recognition.