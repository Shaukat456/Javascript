// 🌐 **DOM MANIPULATION** - Making Websites Interactive & Dynamic

// ---

// ## 🧠 What is DOM?

// **DOM (Document Object Model)** is like a **family tree** of your HTML elements. Think of it as:
// - 🏠 Your HTML page is a house
// - 🚪 Each element (div, p, button) is a room
// - 🔑 JavaScript is your master key to access and modify any room

// **Real-World Analogy:** DOM is like a **building blueprint** that you can:
// - Find specific rooms (elements)
// - Change room decorations (styles)
// - Add new rooms (create elements)
// - Remove rooms (delete elements)
// - Connect rooms with intercoms (event listeners)

// ---

// ## 🎯 1. FINDING ELEMENTS - The GPS System

// ### Basic Selection Methods

// ```javascript
// // 🆔 By ID - Like finding a person by SSN (unique)
// let mainTitle = document.getElementById("main-title");

// // 🏷️ By Class - Like finding all employees in "Marketing" department
// let allButtons = document.getElementsByClassName("btn");

// // 🏗️ By Tag - Like finding all "div" rooms in the building
// let allDivs = document.getElementsByTagName("div");

// // 🎯 Modern CSS Selectors (Most Powerful & Flexible)
// let firstButton = document.querySelector(".btn");           // First match
// let allButtons2 = document.querySelectorAll(".btn");        // All matches
// let specificDiv = document.querySelector("#header .nav");   // Nested selection
// ```

// ### Advanced Selection Examples

// ```javascript
// // Find by attributes
// let emailInput = document.querySelector('input[type="email"]');
// let requiredFields = document.querySelectorAll('input[required]');
// let dataElements = document.querySelectorAll('[data-category="products"]');

// // Complex selectors
// let firstChild = document.querySelector('ul li:first-child');
// let lastButton = document.querySelector('.container button:last-of-type');
// let evenRows = document.querySelectorAll('tr:nth-child(even)');
// ```

// ---

// ## 🔧 2. CHANGING CONTENT - The Editor's Toolkit

// ### Text vs HTML Content

// ```javascript
// let titleElement = document.getElementById("page-title");

// // Change text only (Safe from XSS attacks)
// titleElement.textContent = "Welcome to Our Store!";

// // Change HTML content (Use carefully - can introduce XSS vulnerabilities)
// titleElement.innerHTML = "<strong>Welcome</strong> to Our <em>Amazing</em> Store!";

// // Get content
// let currentText = titleElement.textContent;
// let currentHTML = titleElement.innerHTML;
// ```

// ### Real-World Example: User Dashboard

// ```javascript
// // Simulating user data from API
// let userData = {
//     name: "Ahmed Ali",
//     email: "ahmed@example.com",
//     notifications: 5,
//     isOnline: true
// };

// function updateUserDashboard(user) {
//     // Update welcome message
//     document.querySelector("#welcome-msg").textContent = `Welcome back, ${user.name}!`;

//     // Update email display
//     document.querySelector("#user-email").textContent = user.email;

//     // Update notification badge
//     let notificationBadge = document.querySelector("#notification-count");
//     notificationBadge.textContent = user.notifications;
//     notificationBadge.style.display = user.notifications > 0 ? "inline" : "none";

//     // Update online status
//     let statusIndicator = document.querySelector("#status-indicator");
//     statusIndicator.textContent = user.isOnline ? "🟢 Online" : "🔴 Offline";
//     statusIndicator.className = user.isOnline ? "status online" : "status offline";
// }

// // Usage
// updateUserDashboard(userData);
// ```

// ---

// ## 🎨 3. STYLING ELEMENTS - The Decorator's Tools

// ### Direct Style Manipulation

// ```javascript
// let box = document.getElementById("my-box");

// // Single style changes
// box.style.backgroundColor = "#3498db";
// box.style.color = "white";
// box.style.padding = "20px";
// box.style.borderRadius = "10px";
// box.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

// // Multiple styles at once
// box.style.cssText = `
//     background: linear-gradient(45deg, #3498db, #2ecc71);
//     color: white;
//     padding: 20px;
//     border-radius: 15px;
//     box-shadow: 0 6px 12px rgba(0,0,0,0.2);
//     transform: scale(1.05);
//     transition: all 0.3s ease;
// `;
// ```

// ### CSS Class Manipulation (Recommended Approach)

// ```javascript
// let element = document.querySelector(".card");

// // Add class
// element.classList.add("active", "highlighted");

// // Remove class
// element.classList.remove("hidden");

// // Toggle class (add if not present, remove if present)
// element.classList.toggle("expanded");

// // Check if class exists
// if (element.classList.contains("premium")) {
//     console.log("This is a premium card!");
// }

// // Replace class
// element.classList.replace("old-theme", "new-theme");
// ```

// ### Real-World Example: Theme Switcher

// ```javascript
// class ThemeSwitcher {
//     constructor() {
//         this.currentTheme = localStorage.getItem('theme') || 'light';
//         this.applyTheme(this.currentTheme);
//     }

//     applyTheme(theme) {
//         document.body.className = `theme-${theme}`;
//         this.currentTheme = theme;
//         localStorage.setItem('theme', theme);

//         // Update theme selector UI
//         document.querySelectorAll('.theme-option').forEach(option => {
//             option.classList.remove('active');
//         });
//         document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
//     }

//     switchTheme(newTheme) {
//         this.applyTheme(newTheme);
//     }

//     toggleTheme() {
//         const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
//         this.applyTheme(newTheme);
//     }
// }

// // Usage
// const themeSwitcher = new ThemeSwitcher();

// // Event listeners for theme buttons
// document.querySelectorAll('.theme-option').forEach(button => {
//     button.addEventListener('click', (e) => {
//         const theme = e.target.dataset.theme;
//         themeSwitcher.switchTheme(theme);
//     });
// });
// ```

// ---

// ## ➕ 4. CREATING ELEMENTS - The Builder's Workshop

// ### Basic Element Creation

// ```javascript
// // Create new element
// let newDiv = document.createElement("div");
// newDiv.textContent = "I'm a dynamically created div!";
// newDiv.className = "dynamic-content";
// newDiv.id = "new-section";

// // Set attributes
// newDiv.setAttribute("data-created", new Date().toISOString());
// newDiv.setAttribute("role", "banner");

// // Add to page
// document.body.appendChild(newDiv);
// ```

// ### Advanced Element Creation with Full Structure

// ```javascript
// function createProductCard(product) {
//     // Create card container
//     let card = document.createElement("div");
//     card.className = "product-card";
//     card.setAttribute("data-product-id", product.id);

//     // Create and set innerHTML (easier for complex structures)
//     card.innerHTML = `
//         <div class="product-image">
//             <img src="${product.image}" alt="${product.name}" loading="lazy">
//             <div class="product-badge ${product.isNew ? 'new' : ''}">${product.isNew ? 'NEW' : ''}</div>
//         </div>
//         <div class="product-info">
//             <h3 class="product-title">${product.name}</h3>
//             <p class="product-description">${product.description}</p>
//             <div class="product-rating">
//                 ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
//                 <span class="rating-count">(${product.reviewCount})</span>
//             </div>
//             <div class="product-price">
//                 ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
//                 <span class="current-price">$${product.price}</span>
//             </div>
//         </div>
//         <div class="product-actions">
//             <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
//                 Add to Cart
//             </button>
//             <button class="btn btn-secondary add-to-wishlist" data-product-id="${product.id}">
//                 ♥ Wishlist
//             </button>
//         </div>
//     `;

//     return card;
// }

// // Usage example
// let sampleProduct = {
//     id: 1,
//     name: "Wireless Headphones",
//     description: "High-quality bluetooth headphones with noise cancellation",
//     price: 99.99,
//     originalPrice: 149.99,
//     image: "headphones.jpg",
//     rating: 4,
//     reviewCount: 128,
//     isNew: true
// };

// let productCard = createProductCard(sampleProduct);
// document.getElementById("products-container").appendChild(productCard);
// ```

// ---

// ## 🗑️ 5. REMOVING ELEMENTS - The Cleanup Crew

// ```javascript
// // Modern way - remove element directly
// let elementToRemove = document.getElementById("old-banner");
// elementToRemove.remove();

// // Old way (still works)
// let oldElement = document.getElementById("legacy-content");
// oldElement.parentNode.removeChild(oldElement);

// // Remove all children
// document.getElementById("container").innerHTML = "";

// // Remove with confirmation
// function safeRemove(elementId) {
//     let element = document.getElementById(elementId);
//     if (element && confirm("Are you sure you want to remove this element?")) {
//         element.remove();
//         console.log(`Element ${elementId} removed successfully`);
//     }
// }
// ```

// ---

// ## 📋 6. REAL-WORLD PROJECT: Interactive Todo List

// ### HTML Structure Required:
// ```html
// <div class="todo-app">
//     <h1>My Todo List</h1>
//     <div class="add-todo">
//         <input type="text" id="todo-input" placeholder="What needs to be done?">
//         <button id="add-btn">Add Todo</button>
//     </div>
//     <div class="filters">
//         <button class="filter-btn active" data-filter="all">All</button>
//         <button class="filter-btn" data-filter="active">Active</button>
//         <button class="filter-btn" data-filter="completed">Completed</button>
//     </div>
//     <ul id="todo-list"></ul>
//     <div class="todo-stats">
//         <span id="todo-count">0 items left</span>
//         <button id="clear-completed">Clear Completed</button>
//     </div>
// </div>
// ```

// ### Complete Todo List Implementation

// ```javascript
// class TodoApp {
//     constructor() {
//         this.todos = JSON.parse(localStorage.getItem('todos')) || [];
//         this.currentFilter = 'all';
//         this.init();
//     }

//     init() {
//         this.renderTodos();
//         this.attachEventListeners();
//         this.updateStats();
//     }

//     attachEventListeners() {
//         // Add new todo
//         document.getElementById('add-btn').addEventListener('click', () => this.addTodo());
//         document.getElementById('todo-input').addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') this.addTodo();
//         });

//         // Filter buttons
//         document.querySelectorAll('.filter-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
//         });

//         // Clear completed
//         document.getElementById('clear-completed').addEventListener('click', () => this.clearCompleted());
//     }

//     addTodo() {
//         const input = document.getElementById('todo-input');
//         const text = input.value.trim();

//         if (text === '') {
//             alert('Please enter a todo item!');
//             return;
//         }

//         const todo = {
//             id: Date.now(),
//             text: text,
//             completed: false,
//             createdAt: new Date().toISOString()
//         };

//         this.todos.unshift(todo);
//         this.saveTodos();
//         this.renderTodos();
//         this.updateStats();

//         input.value = '';
//         input.focus();
//     }

//     toggleTodo(id) {
//         this.todos = this.todos.map(todo =>
//             todo.id === id ? { ...todo, completed: !todo.completed } : todo
//         );
//         this.saveTodos();
//         this.renderTodos();
//         this.updateStats();
//     }

//     deleteTodo(id) {
//         if (confirm('Are you sure you want to delete this todo?')) {
//             this.todos = this.todos.filter(todo => todo.id !== id);
//             this.saveTodos();
//             this.renderTodos();
//             this.updateStats();
//         }
//     }

//     editTodo(id, newText) {
//         this.todos = this.todos.map(todo =>
//             todo.id === id ? { ...todo, text: newText } : todo
//         );
//         this.saveTodos();
//         this.renderTodos();
//     }

//     setFilter(filter) {
//         this.currentFilter = filter;
//         document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
//         document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
//         this.renderTodos();
//     }

//     getFilteredTodos() {
//         switch (this.currentFilter) {
//             case 'active':
//                 return this.todos.filter(todo => !todo.completed);
//             case 'completed':
//                 return this.todos.filter(todo => todo.completed);
//             default:
//                 return this.todos;
//         }
//     }

//     renderTodos() {
//         const todoList = document.getElementById('todo-list');
//         const filteredTodos = this.getFilteredTodos();

//         todoList.innerHTML = '';

//         if (filteredTodos.length === 0) {
//             todoList.innerHTML = `
//                 <li class="empty-state">
//                     <p>No todos ${this.currentFilter === 'all' ? '' : this.currentFilter} yet!</p>
//                 </li>
//             `;
//             return;
//         }

//         filteredTodos.forEach(todo => {
//             const li = document.createElement('li');
//             li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
//             li.innerHTML = `
//                 <div class="todo-content">
//                     <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
//                     <span class="todo-text" data-id="${todo.id}">${todo.text}</span>
//                 </div>
//                 <div class="todo-actions">
//                     <button class="edit-btn" title="Edit">✏️</button>
//                     <button class="delete-btn" title="Delete">🗑️</button>
//                 </div>
//             `;

//             // Add event listeners to the todo item
//             const checkbox = li.querySelector('.todo-checkbox');
//             const deleteBtn = li.querySelector('.delete-btn');
//             const editBtn = li.querySelector('.edit-btn');
//             const textSpan = li.querySelector('.todo-text');

//             checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
//             deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
//             editBtn.addEventListener('click', () => this.enableEdit(todo.id, textSpan));

//             todoList.appendChild(li);
//         });
//     }

//     enableEdit(id, textElement) {
//         const currentText = textElement.textContent;
//         const input = document.createElement('input');
//         input.type = 'text';
//         input.value = currentText;
//         input.className = 'edit-input';

//         textElement.replaceWith(input);
//         input.focus();
//         input.select();

//         const saveEdit = () => {
//             const newText = input.value.trim();
//             if (newText && newText !== currentText) {
//                 this.editTodo(id, newText);
//             } else {
//                 this.renderTodos();
//             }
//         };

//         input.addEventListener('blur', saveEdit);
//         input.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') saveEdit();
//             if (e.key === 'Escape') this.renderTodos();
//         });
//     }

//     clearCompleted() {
//         const completedCount = this.todos.filter(todo => todo.completed).length;

//         if (completedCount === 0) {
//             alert('No completed todos to clear!');
//             return;
//         }

//         if (confirm(`Clear ${completedCount} completed todo${completedCount > 1 ? 's' : ''}?`)) {
//             this.todos = this.todos.filter(todo => !todo.completed);
//             this.saveTodos();
//             this.renderTodos();
//             this.updateStats();
//         }
//     }

//     updateStats() {
//         const activeCount = this.todos.filter(todo => !todo.completed).length;
//         const totalCount = this.todos.length;
//         const completedCount = totalCount - activeCount;

//         document.getElementById('todo-count').textContent =
//             `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

//         const clearBtn = document.getElementById('clear-completed');
//         clearBtn.style.display = completedCount > 0 ? 'block' : 'none';
//         clearBtn.textContent = `Clear Completed (${completedCount})`;
//     }

//     saveTodos() {
//         localStorage.setItem('todos', JSON.stringify(this.todos));
//     }
// }

// // Initialize the app
// const todoApp = new TodoApp();
// ```

// ---

// ## 🎮 7. REAL-WORLD PROJECT: Interactive Image Gallery

// ```javascript
// class ImageGallery {
//     constructor(containerSelector) {
//         this.container = document.querySelector(containerSelector);
//         this.currentIndex = 0;
//         this.images = [];
//         this.init();
//     }

//     init() {
//         this.createGalleryStructure();
//         this.attachEventListeners();
//     }

//     createGalleryStructure() {
//         this.container.innerHTML = `
//             <div class="gallery-main">
//                 <div class="main-image-container">
//                     <img id="main-image" src="" alt="" loading="lazy">
//                     <div class="image-overlay">
//                         <button class="nav-btn prev-btn">❮</button>
//                         <button class="nav-btn next-btn">❯</button>
//                         <div class="image-info">
//                             <span class="image-counter"></span>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="thumbnail-container">
//                     <div class="thumbnails"></div>
//                 </div>
//             </div>
//             <div class="gallery-controls">
//                 <button id="slideshow-btn">▶️ Start Slideshow</button>
//                 <button id="fullscreen-btn">🔍 Fullscreen</button>
//             </div>
//         `;
//     }

//     loadImages(imageArray) {
//         this.images = imageArray;
//         this.renderThumbnails();
//         this.showImage(0);
//     }

//     renderThumbnails() {
//         const thumbnailContainer = this.container.querySelector('.thumbnails');
//         thumbnailContainer.innerHTML = '';

//         this.images.forEach((image, index) => {
//             const thumb = document.createElement('img');
//             thumb.src = image.thumbnail || image.src;
//             thumb.alt = image.alt;
//             thumb.className = 'thumbnail';
//             thumb.dataset.index = index;
//             thumb.addEventListener('click', () => this.showImage(index));
//             thumbnailContainer.appendChild(thumb);
//         });
//     }

//     showImage(index) {
//         if (index < 0 || index >= this.images.length) return;

//         this.currentIndex = index;
//         const image = this.images[index];

//         // Update main image
//         const mainImage = this.container.querySelector('#main-image');
//         mainImage.src = image.src;
//         mainImage.alt = image.alt;

//         // Update counter
//         this.container.querySelector('.image-counter').textContent =
//             `${index + 1} / ${this.images.length}`;

//         // Update active thumbnail
//         this.container.querySelectorAll('.thumbnail').forEach((thumb, i) => {
//             thumb.classList.toggle('active', i === index);
//         });

//         // Preload next image for better performance
//         if (index + 1 < this.images.length) {
//             const nextImage = new Image();
//             nextImage.src = this.images[index + 1].src;
//         }
//     }

//     attachEventListeners() {
//         // Navigation buttons
//         this.container.querySelector('.prev-btn').addEventListener('click', () => {
//             this.showImage(this.currentIndex - 1);
//         });

//         this.container.querySelector('.next-btn').addEventListener('click', () => {
//             this.showImage(this.currentIndex + 1);
//         });

//         // Keyboard navigation
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'ArrowLeft') this.showImage(this.currentIndex - 1);
//             if (e.key === 'ArrowRight') this.showImage(this.currentIndex + 1);
//             if (e.key === 'Escape') this.exitFullscreen();
//         });

//         // Slideshow
//         this.container.querySelector('#slideshow-btn').addEventListener('click', () => {
//             this.toggleSlideshow();
//         });

//         // Fullscreen
//         this.container.querySelector('#fullscreen-btn').addEventListener('click', () => {
//             this.toggleFullscreen();
//         });
//     }

//     toggleSlideshow() {
//         const btn = this.container.querySelector('#slideshow-btn');

//         if (this.slideshowInterval) {
//             clearInterval(this.slideshowInterval);
//             this.slideshowInterval = null;
//             btn.textContent = '▶️ Start Slideshow';
//         } else {
//             this.slideshowInterval = setInterval(() => {
//                 const nextIndex = (this.currentIndex + 1) % this.images.length;
//                 this.showImage(nextIndex);
//             }, 3000);
//             btn.textContent = '⏸️ Stop Slideshow';
//         }
//     }

//     toggleFullscreen() {
//         if (!document.fullscreenElement) {
//             this.container.requestFullscreen();
//         } else {
//             document.exitFullscreen();
//         }
//     }

//     exitFullscreen() {
//         if (document.fullscreenElement) {
//             document.exitFullscreen();
//         }
//     }
// }

// // Usage Example
// const gallery = new ImageGallery('#image-gallery');

// // Sample image data
// const sampleImages = [
//     { src: 'image1.jpg', alt: 'Beautiful landscape', thumbnail: 'thumb1.jpg' },
//     { src: 'image2.jpg', alt: 'City skyline', thumbnail: 'thumb2.jpg' },
//     { src: 'image3.jpg', alt: 'Ocean waves', thumbnail: 'thumb3.jpg' },
//     { src: 'image4.jpg', alt: 'Mountain view', thumbnail: 'thumb4.jpg' }
// ];

// gallery.loadImages(sampleImages);
// ```

// ---

// ## 🔥 8. PERFORMANCE OPTIMIZATION TIPS

// ### DOM Query Optimization

// ```javascript
// // ❌ Bad - Queries DOM multiple times
// function updateMultipleElements() {
//     document.getElementById("title").style.color = "red";
//     document.getElementById("title").style.fontSize = "24px";
//     document.getElementById("title").textContent = "Updated!";
// }

// // ✅ Good - Cache DOM queries
// function updateMultipleElementsOptimized() {
//     const title = document.getElementById("title");
//     title.style.color = "red";
//     title.style.fontSize = "24px";
//     title.textContent = "Updated!";
// }

// // ✅ Even Better - Use CSS classes and batch updates
// function updateMultipleElementsBest() {
//     const title = document.getElementById("title");
//     title.classList.add("updated-style");
//     title.textContent = "Updated!";
// }
// ```

// ### Document Fragment for Multiple Additions

// ```javascript
// // ❌ Bad - Triggers reflow for each addition
// function addMultipleItemsBad(items) {
//     const list = document.getElementById("item-list");
//     items.forEach(item => {
//         const li = document.createElement("li");
//         li.textContent = item;
//         list.appendChild(li); // Reflow happens here each time
//     });
// }

// // ✅ Good - Use DocumentFragment to batch additions
// function addMultipleItemsGood(items) {
//     const list = document.getElementById("item-list");
//     const fragment = document.createDocumentFragment();

//     items.forEach(item => {
//         const li = document.createElement("li");
//         li.textContent = item;
//         fragment.appendChild(li);
//     });

//     list.appendChild(fragment); // Single reflow
// }
// ```

// ### Event Delegation

// ```javascript
// // ❌ Bad - Adding listener to each item
// function addListenersToBad() {
//     document.querySelectorAll('.list-item').forEach(item => {
//         item.addEventListener('click', handleItemClick);
//     });
// }

// // ✅ Good - Event delegation (single listener)
// function addListenersGood() {
//     document.getElementById('item-list').addEventListener('click', (e) => {
//         if (e.target.classList.contains('list-item')) {
//             handleItemClick(e);
//         }
//     });
// }

// function handleItemClick(e) {
//     console.log('Item clicked:', e.target.textContent);
// }
// ```

// ---

// ## 🛡️ 9. SECURITY BEST PRACTICES

// ### Preventing XSS Attacks

// ```javascript
// // ❌ Dangerous - Direct HTML insertion
// function displayUserInputBad(userInput) {
//     document.getElementById("output").innerHTML = userInput; // XSS vulnerability
// }

// // ✅ Safe - Use textContent for user input
// function displayUserInputSafe(userInput) {
//     document.getElementById("output").textContent = userInput;
// }

// // ✅ Safe HTML insertion with sanitization
// function displayUserInputSanitized(userInput) {
//     // Basic sanitization (use proper library like DOMPurify in production)
//     const sanitized = userInput
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;')
//         .replace(/'/g, '&#x27;');

//     document.getElementById("output").innerHTML = sanitized;
// }
// ```

// ### Input Validation

// ```javascript
// function validateAndProcessForm(formData) {
//     // Always validate on both client and server
//     const errors = [];

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//         errors.push("Please enter a valid email address");
//     }

//     // Name validation
//     if (!formData.name || formData.name.trim().length < 2) {
//         errors.push("Name must be at least 2 characters long");
//     }

//     // Age validation
//     const age = parseInt(formData.age);
//     if (isNaN(age) || age < 13 || age > 120) {
//         errors.push("Please enter a valid age between 13 and 120");
//     }

//     if (errors.length > 0) {
//         displayErrors(errors);
//         return false;
//     }

//     return true;
// }

// function displayErrors(errors) {
//     const errorContainer = document.getElementById("error-messages");
//     errorContainer.innerHTML = `
//         <div class="error-list">
//             <h3>Please fix the following errors:</h3>
//             <ul>
//                 ${errors.map(error => `<li>${error}</li>`).join('')}
//             </ul>
//         </div>
//     `;
//     errorContainer.scrollIntoView({ behavior: 'smooth' });
// }
// ```

// ---

// ## 🚀 10. MODERN DOM MANIPULATION TECHNIQUES

// ### Using MutationObserver

// ```javascript
// // Monitor DOM changes
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.type === 'childList') {
//             console.log('Children added or removed:', mutation);
//         } else if (mutation.type === 'attributes') {
//             console.log('Attribute changed:', mutation.attributeName);
//         }
//     });
// });

// // Start observing
// observer.observe(document.getElementById('watched-element'), {
//     childList: true,
//     attributes: true,
//     subtree: true
// });
// ```

// ### Intersection Observer for Lazy Loading

// ```javascript
// // Lazy load images when they come into view
// const imageObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const img = entry.target;
//             img.src = img.dataset.src;
//             img.classList.remove('lazy');
//             imageObserver.unobserve(img);
//         }
//     });
// });

// // Observe all lazy images
// document.querySelectorAll('img[data-src]').forEach(img => {
//     imageObserver.observe(img);
// });
// ```

// ---

// ## 📊 11. DEBUGGING DOM MANIPULATION

// ### Console Debugging Techniques

// ```javascript
// // Debug element selection
// function debugElementSelection(selector) {
//     const elements = document.querySelectorAll(selector);
//     console.log(`Selector "${selector}" found ${elements.length} elements:`, elements);
//     return elements;
// }

// // Monitor element changes
// function monitorElement(element) {
//     const observer = new MutationObserver((mutations) => {
//         console.log('Element changed:', mutations);
//     });

//     observer.observe(element, {
//         attributes: true,
//         childList: true,
//         subtree: true,
//         attributeOldValue: true,
//         childOldValue: true
//     });

//     return observer;
// }

// // Performance monitoring
// function measureDOMOperation(operation, description) {
//     const startTime = performance.now();
//     operation();
//     const endTime = performance.now();
//     console.log(`${description} took ${endTime - startTime} milliseconds`);
// }

// // Usage
// measureDOMOperation(() => {
//     // Some DOM manipulation
//     for (let i = 0; i < 1000; i++) {
//         const div = document.createElement('div');
//         document.body.appendChild(div);
//     }
// }, 'Creating 1000 divs');
// ```

// ---

// ## 🎯 PRACTICE CHALLENGES

// ### Challenge 1: Dynamic Form Builder
// Create a form builder that allows users to add different input types dynamically

// ### Challenge 2: Drag and Drop List
// Build a sortable list where users can drag and drop items to reorder them

// ### Challenge 3: Real-time Search Filter
// Create a search box that filters a list of items in real-time as user types

// ### Challenge 4: Modal Dialog System
// Build a reusable modal system that can display different content types

// ### Challenge 5: Infinite Scroll
// Implement infinite scrolling for a list that loads more content as user scrolls

// ---

// **🎉 Congratulations!** You now have comprehensive knowledge of DOM manipulation. Practice these concepts by building real projects and you'll become a DOM manipulation expert!

// ---

// ## 📚 Additional Resources

// - MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
// - JavaScript.info DOM: https://javascript.info/document
// - Web APIs: https://developer.mozilla.org/en-US/docs/Web/API
