# Next Query - Post Management Application

A modern, responsive post management application built with Next.js, TanStack Query, and Tailwind CSS. This application provides a complete CRUD interface for managing posts with beautiful UI components and smooth user experience.

## 🚀 Features

### Core Functionality

- ✅ **View Posts**: Beautiful grid layout with responsive design
- ✅ **Create Posts**: Rich form with validation and character limits
- ✅ **Edit Posts**: In-line editing with pre-populated data
- ✅ **Delete Posts**: Safe deletion with confirmation dialog
- ✅ **Post Details**: Dedicated detail page for each post

### User Experience

- 🎨 **Modern UI**: Gradient backgrounds, shadows, and smooth animations
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast Loading**: Optimized with React Query caching and background updates
- 🔄 **Loading States**: Beautiful skeleton loading components
- ❌ **Error Handling**: Comprehensive error states with retry functionality
- 🎯 **Type Safety**: Full TypeScript implementation

### Technical Features

- 🔄 **Optimistic Updates**: Instant UI updates with automatic rollback on errors
- 💾 **Smart Caching**: Intelligent data caching with TanStack Query
- 🎭 **State Management**: Robust state management with React Query mutations
- 🛡️ **Input Validation**: Form validation with character limits and required fields
- 🎪 **Animations**: Smooth hover effects and transitions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
src/
├── api/                         # API functions for CRUD operations
├── app/
│   ├── components/              # Component UI
│   ├── create/
│   │   └── page.tsx             # Create post page
│   ├── posts/
│   │   └── [id]/                # Post detail page
│   ├── globals.css              # Global styles and utilities
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── hooks/
│   └── usePost.ts               # Custom hook for post operations
└── types/
    └── post.ts                  # TypeScript interfaces
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/irfan-za/next-query
   cd next-query
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API base URL:

   ```env
   NEXT_PUBLIC_API_URL=https://gorest.co.in/public/v2
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Viewing Posts

- The home page displays all posts in a responsive grid layout
- Each post card shows the title, excerpt, user information, and a "Read more" link
- Click on any post card to view the full post details

### Creating Posts

- Click the "Create New Post" button on the home page
- Fill in the required fields (User ID, Title, Content)
- The form includes real-time character counting and validation
- Submit to create the post and automatically navigate to the detail page

### Editing Posts

- Navigate to any post detail page
- Click the "Edit" button to switch to edit mode
- Modify the post information in the pre-populated form
- Save changes or cancel to return to view mode

### Deleting Posts

- On the post detail page, click the "Delete" button
- Confirm deletion in the modal dialog
- The post will be permanently deleted and you'll be redirected to the home page

## 🔧 API Integration

The application uses a custom hook (`usePost`) that wraps TanStack Query for:

- **Queries**: Fetching posts list and individual posts
- **Mutations**: Creating, updating, and deleting posts
- **Cache Management**: Automatic cache invalidation and updates
- **Error Handling**: Centralized error management
- **Loading States**: Built-in loading state management

### API Endpoints Expected

```typescript
GET    /posts       # Fetch all posts
GET    /posts/:id   # Fetch single post
POST   /posts       # Create new post
PUT    /posts/:id   # Update existing post
DELETE /posts/:id   # Delete post
```
