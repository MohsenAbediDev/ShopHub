## ShopHub

![Screenshot (873)](https://github.com/user-attachments/assets/3302bf6c-3ac7-4b34-a2a5-ff6ea96fca85)

[Live demo](https://mohsenabedidev.github.io/ShopHub/)

### Description

**ShopHub** is an e-commerce platform designed to offer users a seamless online shopping experience. It includes a responsive interface, and a theme switcher.

### Features

- Product catalog display
- Shopping cart management
- Theme switching (light/dark mode)
- User-friendly navigation
- Responsive design for mobile and desktop
- Integrated with local storage for cart data

### Project Structure

```
ShopHub/
├── public/
│   ├── Fonts/              # Custom fonts used in the application
│   ├── icons/              # SVG and PNG icons for various UI elements
│   ├── images/             # Product and user-related images
├── src/
│   ├── Css/                # Custom CSS for styling the web app
│   ├── Js/                 # JavaScript files for functionality (cart, navigation, theme, etc.)
├── node_modules/           # External libraries and dependencies
├── index.html              # Main HTML file
├── package.json            # Project metadata and dependencies
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MohsenAbediDev/ShopHub.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd ShopHub
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### Usage

1. **Start the development server:**

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

2. **Using Tailwind CSS:**
   ```bash
   tailwindcss -i ./src/Css/input.css -o ./src/Css/output.css --watch
   ```
   You can now edit your Tailwind CSS code.

### Technologies Used

- **HTML5**
- **Tailwind Css**
- **JavaScript**
- **Json Server** for lightweight database management

### Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is licensed under the MIT License.
