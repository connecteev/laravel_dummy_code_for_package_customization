## Dummy code for testing Laravel package customization using Vite
- This repo contains a laravel app and a dummy package. The dummy package code is located at _LOCAL_PACKAGES/keenbrain_dummy_package/
- Tech Stack: Laravel with InertiaJs + vue with SSR enabled

- The goal is to:
    - Finish migrating the package from webpack (laravel mix) to vite, and get http://127.0.0.1:8000/billing and http://127.0.0.1:8000/foo to work. This currently shows an error in the console.
    - Then be able to customize the page at /billing of the keenbrain/dummy-package package locally, so I can see and learn how to do it with other pages hosted within a Laravel package.
-----------------------------------------------------------------------------
## Installation

Terminal 1: (for the main app)
- `cp .env.example .env`
- create database: laravel_dummy_code_for_package_customization / update DB credentials in .env
- `composer install`
- `php artisan key:generate`
- `php artisan migrate:fresh --seed`
- `php artisan serve`

Terminal 2: (for the main app)
- `npm install`
- `npm run build`
- `npm run dev`

Terminal 3: (for the package)
- `cd _LOCAL_PACKAGES/keenbrain_dummy_package/`
- `composer install`
- `npm run build`

## Test it out
- Go to http://127.0.0.1:8000/ and log in with: test@example.com / password (or go to http://127.0.0.1:8000/register and create an account. This will log you in.)
- After you are logged in, you will end up on http://127.0.0.1:8000/dashboard
- Go to http://127.0.0.1:8000/foo to check if the page loads. This does NOT WORK.
- Go to http://127.0.0.1:8000/billing to check if the page loads. This does NOT WORK.

Error in console when we go to http://127.0.0.1:8000/billing:
```
GET http://[::1]:5173/resources/js/Pages/MyPortal.vue net::ERR_ABORTED 404 (Not Found)
index.js:4 Uncaught (in promise) Error: Page not found: ./Pages/MyPortal.vue
    at resolvePageComponent (index.js:4:15)
    at resolve (app.js:13:24)
    at r (createInertiaApp.ts:34:54)
    at j2 (createInertiaApp.ts:38:24)
    at app.js:11:1
```
-----------------------------------------------------------------------------

## Workflow to make changes to the package source files:
Is there a better way to making changes to the package source files directly, and recompiling assets (including _LOCAL_PACKAGES/keenbrain_dummy_package/public/js/app.js) using `npm run build` each time?
- ex: publish assets from the package into the laravel app?
