# NeoBiz Project

**Backend**: Laravel 10 - Sanctum Auth, 2FA Email, CRUD Modules  
**Frontend**: React 18 + Vite + Tailwind CSS + TypeScript

---

## Structure du projet

/backend -> API Laravel 10 (Sanctum, CRUD Clients, Factures, IA, etc.) /frontend -> Frontend React (Login, 2FA, Clients, Factures Dashboard)


---

## Setup Backend Laravel

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve



---

## Setup Frontend React 

```bash
cd frontend
npm install
npm run dev
