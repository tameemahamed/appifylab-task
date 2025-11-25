# Full Stack Socialmedia WEB App

A Laravel + Inertia (React) starter app used to demonstrate a small social feed (posts, comments, authentication) and a matching frontend built with React + Inertia + Tailwind CSS. This README explains how to get the project running locally, the frontend structure, and the backend structure.

---

## Core Technologies:

* Frontend: React, Tailwind CSS, Vite.
* Backend: PHP(Laravel), MySQL database, Laravel Breeze for authentication.

## Table of Contents

- Getting Started
- Frontend Documentation
- Backend Documentation

## Getting Started
These instructions will get the project running on your local machine for development and testing purposes.

### Prerequisites

* PHP (8.0+ recommended)
* Composer
* Node.js (16+ recommended) and npm or yarn
* A database (MySQL, MariaDB, or SQLite)
* Git

### Clone the repository

```bash
git clone https://github.com/tameemahamed/appifylab-task.git
cd appifylab-task
```

### Backend setup (Laravel)

1. Install PHP dependencies:

```bash
composer install
```

2. Copy `.env` and generate app key:

```bash
cp .env.example .env
php artisan key:generate
```

3. Configure `.env` database credentials (DB_DATABASE, DB_USERNAME, DB_PASSWORD, etc.).

4. Run migrations:

```bash
php artisan migrate
```

5. Create a storage symlink (for public file access):

```bash
php artisan storage:link
```

6. Start the Laravel development server:

```bash
php artisan serve
```

The backend will typically be available at `http://127.0.0.1:8000`.

### Frontend setup (Node / Vite)

1. Install JS dependencies:

```bash
npm install
```

2. Run the frontend development build (Vite):

```bash
npm run dev
```

--- 

## Frontend Documentation

The frontend is implemented using **Inertia.js** + **React** and styled with **Tailwind CSS**. Vite is used as the build tool.

### Project structure (important folders)

* `resources/js/` - main frontend source code

  * `Pages/` - Inertia page components
  * `Layouts/` - Shared page layouts (AuthenticatedLayout, GuestLayout, etc.)
  * `Components/` - Reusable UI components (PostCard, CommentInputArea, ReplyInputArea, etc.)
  * `bootstrap.js` - Inertia + initial JS boot file

* `resources/css/` - Tailwind/CSS files

* `vite.config.js` - Vite configuration

* `tailwind.config.js` - Tailwind configuration

### How Inertia pages work

Each route served by Laravel usually returns an Inertia response like `Inertia::render('Feed', $props)`. The corresponding React page lives in `resources/js/Pages/Feed.jsx` (or `.tsx`).

### Components

* Layouts handle global navigation, authenticated user UI and theme (light/dark).
* `CreatePostLayout` or `PostLayout` components contain the post creation UI and feed.
* `CommentInputArea` and `ReplyInputArea` are used for comments and nested replies.
* Utility components may include `PrimaryButton`, `TextInput`, `InputError`, etc.

### Authentication (frontend)

* Login and Register pages are implemented as Inertia pages and use the Laravel auth controllers for actions.
* After login, Inertia redirects to protected pages.

---

## Backend Documentation

The backend is a Laravel application that provides web routes and Inertia responses. Key responsibilities include authentication, post creation, comment handling, file uploads and user management.

### Database Schema
![Database Schema Image](https://i.ibb.co.com/N6QRy2ct/Screenshot-from-2025-11-25-20-20-33.png)

### Important folders

* `app/Http/Controllers/` - controllers that handle requests.
* `app/Models/` - Eloquent models those provide an Object-Relational Mapper (ORM) that simplifies interaction with database tables.
* `database/migrations/` - database schema definitions.
* `routes/web.php` - web routes
* `routes/api.php` - API routes

### Controllers & Models

* Controllers typically validate requests (`$request->validate([...])`), call model methods and return Inertia responses or redirects.
* Models use Eloquent relationships, for example `Post` have `comments()` and `user()` relations.

### File Storage

* Uploaded images should be stored using the `public` disk. Ensure `php artisan storage:link` has been run so files are served from `/storage`.

### Database

* Configure your database in `.env` using standard Laravel env vars (DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD).
* Run `php artisan migrate` to create tables.

---

## Environment variables (example)

Add or adjust these variables in your `.env` file:

```env
APP_NAME="Social Media"
APP_ENV=local
APP_KEY=base64:... # set by key:generate
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=socialmedia
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=public
```

---

