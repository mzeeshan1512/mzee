# Project Directory Structure

This document provides a high-level overview and description of the files and folders within the project.

```plaintext
src
├── app
│  ├── login
│  │  └── page.tsx              # Login page component.
│  ├── favicon.ico              # Favicon for the application.
│  ├── global-error.tsx         # Handles global error boundaries.
│  ├── layout.tsx               # Root layout component for the application.
│  ├── loading.tsx              # Loading state component.
│  ├── not-found.tsx            # Handles 404 (Not Found) pages.
│  └── page.tsx                 # Main or home page component.
│
├── assets
│  ├── bgs
│  │  ├── home-dark.png         # Background image for the home page (dark theme).
│  │  └── whatsapp.jpg          # Background image for WhatsApp-related features.
│  └── logos
│     ├── appLogo.png           # Primary logo for the application.
│     └── chat.png              # Logo or icon for chat features.
│
├── shared
│  ├── components
│  │  ├── social-share
│  │  │  ├── index.tsx          # Social share component logic.
│  │  │  └── style.css          # Styles for the social share component.
│  │  ├── glassmorphism.tsx     # Component for glassmorphism UI effects.
│  │  ├── particles-animation.tsx # Component for animated particles.
│  │  ├── pop-up.tsx            # Generic pop-up component.
│  │  ├── toast.tsx             # Toast notification component.
│  │  └── tooltip.tsx           # Tooltip component.
│  │
│  ├── constants-enums
│  │  └── reused-tailwind-css.ts # File containing reusable Tailwind CSS constants.
│  │
│  ├── firebase
│  │  └── config.ts             # Firebase configuration setup.
│  │
│  ├── form
│  │  ├── error.utils.ts        # Utility functions for handling form errors.
│  │  └── inputs.tsx            # Form input components.
│  │
│  ├── icon
│  │  └── social.tsx            # Social media icons.
│  │
│  ├── layouts
│  │  ├── fall-back-layout
│  │  │  ├── index.tsx          # Fallback layout component.
│  │  │  ├── styles.css         # Styles for the fallback layout.
│  │  │  └── Untitled-1.json    # JSON configuration or mock data for fallback.
│  │  ├── settings
│  │  │  ├── index.tsx          # Settings layout component.
│  │  │  └── whats-app-chat.tsx # WhatsApp chat component within settings.
│  │  ├── app-layout.tsx        # General app layout component.
│  │  ├── app-logo.tsx          # Component for rendering the app logo.
│  │  ├── error-boundary.tsx    # Error boundary component.
│  │  └── screen-loader.tsx     # Component for loading screens.
│  │
│  ├── theme
│  │  ├── provider.tsx          # Theme provider for context-based theming.
│  │  └── theme-toggler.tsx     # Theme toggle component (light/dark).
│  │
│  ├── utils
│  │  ├── date.ts               # Utility functions for date manipulation.
│  │  └── encode-decode.ts      # Utility functions for encoding and decoding data.
│  │
│  └── app-config.ts            # General application configuration.
│
├── styles
│  ├── globals.css              # Global CSS styles for the application.
│  └── gradient-glass-morphic.css # CSS for gradient and glassmorphic effects.
│
└── middleware.ts               # Middleware for handling server-side logic.
