# Project Structure

This project is organized as follows:

```plaintext
├── .vscode
│   └── settings.json                 # VSCode-specific settings
├── public                            # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app                           # Next.js pages and app routing
│   │   ├── (public)
│   │   │   └── (home)
│   │   │       ├── (sections)        # Sections within the home page
│   │   │       ├── page.tsx          # Home page entry component
│   │   │       └── template.tsx      # Home page template
│   │   ├── out-bound-redirect        # Redirect functionality
│   │   │   └── page.tsx
│   │   ├── favicon.ico               # Favicon file
│   │   ├── global-error.tsx          # Global error handling component
│   │   ├── layout.tsx                # Global layout component
│   │   └── not-found.tsx             # Custom 404 page
│   ├── assets                        # Project assets
│   │   ├── bgs                       # Background images
│   │   │   ├── home-dark.png
│   │   │   └── whatsapp.jpg
│   │   ├── logos                     # Logo images
│   │   │   ├── appLogo.png
│   │   │   └── chat.png
│   │   └── about.png
│   ├── shared                        # Shared components and utilities
│   │   ├── components
│   │   │   ├── button.tsx
│   │   │   ├── particles-animation.tsx
│   │   │   ├── pop-up.tsx
│   │   │   ├── show-if.tsx
│   │   │   ├── svg-gradient-binder.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── trusted-redirect.tsx
│   │   ├── config                    # Configuration files
│   │   │   ├── firebase.ts
│   │   │   └── index.ts
│   │   ├── hooks                     # Custom hooks
│   │   │   ├── use-scroll-into-view
│   │   │   │   ├── utils             # Utilities for scrolling hooks
│   │   │   │   │   ├── ease-in-out-quad.ts
│   │   │   │   │   ├── get-relative-position.ts
│   │   │   │   │   ├── get-scroll-start.ts
│   │   │   │   │   └── set-scroll-param.ts
│   │   │   │   ├── use-scroll-into-view.ts
│   │   │   │   └── use-scroll-spy.ts
│   │   │   ├── use-debounced-value.ts
│   │   │   ├── use-document.ts
│   │   │   ├── use-interval.ts
│   │   │   ├── use-isomorphic-effect.ts
│   │   │   ├── use-media-query.ts
│   │   │   ├── use-network.ts
│   │   │   ├── use-orientation.ts
│   │   │   ├── use-reduced-motion.ts
│   │   │   ├── use-timeout.ts
│   │   │   └── use-window-event.ts
│   │   ├── icon                      # Icon components
│   │   │   ├── common.tsx
│   │   │   └── social.tsx
│   │   ├── layouts                   # Layout components
│   │   │   ├── (components)          # Layout-specific components
│   │   │   │   ├── header
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── menu.tsx
│   │   │   │   │   ├── mobile-menu.tsx
│   │   │   │   │   └── scroll-spy.tsx
│   │   │   │   ├── settings
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── scroll-to-top.tsx
│   │   │   │   │   └── whats-app-chat.tsx
│   │   │   │   ├── app-logo.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   └── types.ts
│   │   │   ├── error                 # Error boundaries and fallback
│   │   │   │   ├── error-boundary.tsx
│   │   │   │   ├── fall-back-layout.tsx
│   │   │   │   └── styles.css
│   │   │   ├── offline-view          # Offline view component
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── app-layout.tsx
│   │   │   ├── content-renderer.tsx
│   │   │   └── horizontal-layout.tsx
│   │   ├── theme                     # Theme provider and toggler
│   │   │   ├── provider.tsx
│   │   │   └── theme-toggler.tsx
│   │   └── utils                     # Utility functions
│   │       └── common.ts
│   └── styles                        # Global styles and effects
│       ├── globals.css
│       ├── gradient-glass-morphic.css
│       └── hover-bottom-outline-effect.css
├── .env                              # Environment variables
├── .env.example                      # Example environment file
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── LICENSE                           # License file
├── next-env.d.ts                     # Next.js environment types
├── next.config.ts                    # Next.js configuration
├── package-lock.json                 # Package-lock for npm
├── package.json                      # Project dependencies
├── postcss.config.mjs                # PostCSS configuration
├── README.md                         # Project readme file
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
