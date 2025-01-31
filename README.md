# Admin Panel

## Description
This project is a responsive admin panel for managing products and users. It includes authentication, API integration, and uses Angular, Tailwind CSS, NgRx, and Angular Material.

## Features
- Admin login
- State management with NgRx
- Product management (view, add, edit, delete)
- User management (view, add, edit, delete)
- Toaster notifications for user actions
- API integration with FakeStore API
- Responsive design

## Setup

### Prerequisites
- Node.js
- Angular CLI

### Installation
1. Clone the repository:
   ```bash
   git clone <git@github.com:elarialatif/paysky-admin-panel.git>
   cd paysky-admin-panel

2. Install dependencies:
  ```bash
  npm install

3. Run the development server:
  ```bash
  ng serve

4. Open your browser and navigate to http://localhost:4200.


5. Login Crdintials 
 - username: mor_2314
 - password: 83r5^_

### API Endpoints

[https://fakestoreapi.com/docs]
- Products 
  1. Get All Products -- Get  https://fakestoreapi.com/products
  2. Get All Categories -- Get   https://fakestoreapi.com/products/categories
  3. Add New Product -- Post   https://fakestoreapi.com/products
  4. Update Product -- Put   https://fakestoreapi.com/products/id
  4. Delete Product -- delete   https://fakestoreapi.com/products/id
- Users 
  1. Get All Users -- Get  https://fakestoreapi.com/users
  2. Add New User -- Post   https://fakestoreapi.com/users
  3. Update User -- Put   https://fakestoreapi.com/users/id
  4. Delete User -- delete   https://fakestoreapi.com/users/id
- User login 
  1. Get All Users -- Post  https://fakestoreapi.com/auth/login


## Final Notes
The "**FakeStore API**" does not include "categories management," so I used "users management" instead.


