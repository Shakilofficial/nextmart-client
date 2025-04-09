## ✨ Features Overview – NEXA E-commerce Platform

NEXA is a full-featured modern e-commerce platform designed with scalability, performance, and user experience in mind. It empowers customers to browse, shop, and checkout seamlessly while offering powerful admin tools for product and order management.

---

### 👤 **User Authentication & Management**
- Secure **JWT-based login, register, logout**
- **Forgot/Reset Password** via email token flow
- **Role-based access control** (Admin, Customer)
- Persistent auth using cookies or localStorage
- Auth state managed via **React Context API**

---

### 🛒 **Shopping Features**
- Fully functional **Cart system**
  - Add, remove, and update item quantity
  - Cart state managed globally using **Redux Toolkit**
  - Persistent cart (stored in localStorage)
- **Wishlist feature**: Add/remove favorite items, synced with backend
- **Coupon system**
  - Admin can generate discount codes
  - Users can apply coupons during checkout
  - Discounts dynamically reflected on order total

---

### 🧾 **Product Management**
- Admin-only **CRUD operations**
  - Create, edit, delete products from dashboard
- Dynamic product listing & filtering by:
  - Category, price range, rating, stock status
- Beautiful, responsive **Product Cards**
- Product **image upload** via Cloudinary
- **Inventory control** & stock tracking

---

### 📦 **Order Management**
- Customers can:
  - Place orders
  - Track current order status
  - View past order history
- Admin Dashboard:
  - View all orders with detailed analytics
  - Update order status (Processing → Shipped → Delivered)
  - Filter orders by date, status, or user

---

### 💳 **Secure Checkout & Payments**
- Integrated with **SSLCommerz** for secure payment flow
- Support for **coupon-based discounts**
- Cart and shipping data validation before processing
- Email confirmation sent post-purchase

---

### 📧 **Email Notification System**
- **Automated emails** for:
  - Registration confirmation
  - Password reset
  - Order confirmations
  - Order status updates

---

### ☁️ **Media Handling**
- All product images handled via **Cloudinary**
- Optimized image delivery with responsive formats

---

### 🎨 **Modern UI/UX**
- Built with **Tailwind CSS** and **Shadcn UI** for sleek design
- Fully **responsive** on all devices
- Smooth **animations** using **Framer Motion**
- **Dark mode** support (optional)
- Consistent form UI/UX using **React Hook Form + Zod**

---

### ⚙️ **Developer-Focused Enhancements**
- **TypeScript-first** for end-to-end type safety
- Centralized **Redux store** with slices for cart, wishlist, coupons
- API abstraction layer using Axios
- Server & client form validation
- **React Query** (optional) or `useEffect` for data fetching
- Modular and scalable code structure


---

### 🗂️ Folder Structure

```bash
src/
├── app/            # App directory (Next.js 15)
├── assets/         # Static assets
├── components/     # Reusable UI components
├── constants/      # Static values and enums
├── contexts/       # React Context API (Auth, Cart, etc.)
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── lib/            # Helpers and API client config
├── middlewares/    # Frontend-level middleware (auth, etc.)
├── pages/          # Fallback or special pages (if used)
├── providers/      # App-level providers (theme, auth)
├── services/       # API interaction logic
├── types/          # Global TypeScript types
├── utils/          # Utility functions
```

---

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/Shakilofficial/nextmart-client.git
cd nextmart-client
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Setup Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_BASE_API=your_backend_url
NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=your_recaptcha_secret
NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=your_recaptcha_site_key
```

#### 4. Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

### 📦 Component Examples

- `components/ui/button.tsx` – Custom Shadcn button
- `components/ui/input.tsx` – Form input with Hook Form
- `components/products/ProductCard.tsx` – Reusable product card

---

### 🔐 Auth Flow

- Secure routes using JWT
- Auth state managed via `context/AuthContext.tsx`
- Stores tokens in cookies/localStorage
- Automatic token refresh (optional)

---

### 📡 API Integration

- Centralized in `lib/api.ts`
- Axios instance with base URL and interceptors
- Typesafe responses with error handling

---

### 💡 Dev Notes

- Codebase uses `.tsx` with strict TypeScript typing
- Tailwind CSS for consistent design
- Custom themes can be configured via `tailwind.config.ts`
- Focused on accessibility and mobile-first design

---

### 📣 Contribution

Have a suggestion or want to contribute? Feel free to fork and PR!

---

> Designed with ❤️ for scalable commerce.
