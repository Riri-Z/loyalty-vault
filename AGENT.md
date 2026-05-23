# AGENT.md — Expo React Native Project

> This file defines the architecture rules, best practices, and conventions for this Expo project.
> Every contributor and AI agent must follow these guidelines strictly.

---

## 📁 Project Structure

```
project-root/
├── app/                        # Expo Router - file-based routing
│   ├── (tabs)/                 # Tab navigation group
│   │   ├── index.tsx           # Home screen
│   │   └── _layout.tsx         # Tab layout config
│   ├── _layout.tsx             # Root layout
│   └── +not-found.tsx          # 404 screen
├── components/                 # Reusable UI components
│   ├── ui/                     # Base UI elements (Button, Input, Card...)
│   └── shared/                 # Shared logic components
├── hooks/                      # Custom React hooks
├── store/                      # Global state (Zustand / Redux)
├── services/                   # API calls and external services
├── constants/                  # Colors, fonts, sizes, config
├── utils/                      # Helper functions
├── types/                      # TypeScript global types & interfaces
├── assets/                     # Images, fonts, icons
└── AGENT.md                    # This file
```

---

## ⚙️ Tech Stack

| Category        | Tool                          |
|----------------|-------------------------------|
| Framework       | Expo SDK 52+                  |
| Navigation      | Expo Router (file-based)      |
| Language        | TypeScript (strict mode)      |
| Styling         | StyleSheet / NativeWind       |
| State           | Zustand                       |
| API calls       | Axios + React Query           |
| Forms           | React Hook Form + Zod         |
| Testing         | Jest + React Native Testing Library |

---

## 🧠 Coding Conventions

### General
- Always use **TypeScript**, never plain JS
- Enable **strict mode** in `tsconfig.json`
- No `any` type — use `unknown` if needed
- Prefer **functional components** only
- Always define **explicit return types** on functions

### Naming
```
Components     → PascalCase       → UserCard.tsx
Hooks          → camelCase        → useAuthStore.ts
Services       → camelCase        → authService.ts
Constants      → UPPER_SNAKE_CASE → MAX_RETRY = 3
Types/Interface→ PascalCase       → UserProfile, ApiResponse
Files          → kebab-case       → user-profile.tsx (except components)
```

### Components
```tsx
// ✅ Good
type Props = {
  title: string;
  onPress: () => void;
};

export const MyButton = ({ title, onPress }: Props): JSX.Element => {
  return <Pressable onPress={onPress}><Text>{title}</Text></Pressable>;
};

// ❌ Bad — no types, default export anonymous
export default ({ title, onPress }) => <Pressable onPress={onPress} />;
```

---

## 🗂️ State Management (Zustand)

```ts
// store/useAuthStore.ts
import { create } from 'zustand';

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
```

---

## 🌐 API / Services

```ts
// services/authService.ts
import axios from 'axios';
import { API_BASE_URL } from '@/constants/config';

const api = axios.create({ baseURL: API_BASE_URL });

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};
```

- All API calls go in `/services`
- Never call `fetch`/`axios` directly inside a component
- Use **React Query** (`useQuery`, `useMutation`) to handle loading/error states

---

## 📋 Forms (React Hook Form + Zod)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
};
```

---

## 🎨 Styling Rules

- Use `StyleSheet.create()` for all styles
- No inline styles except for dynamic values
- Define all colors in `constants/colors.ts`
- Define all spacing/font sizes in `constants/theme.ts`

```ts
// constants/colors.ts
export const Colors = {
  primary: '#4F46E5',
  background: '#FFFFFF',
  text: '#1F2937',
  error: '#EF4444',
};
```

---

## 🔐 Environment Variables

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.better-health.com
EXPO_PUBLIC_APP_ENV=development
```

```ts
// constants/config.ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL!;
```

- Never hardcode secrets or API keys
- All public env vars must start with `EXPO_PUBLIC_`
- Never commit `.env` — always commit `.env.example`

---

## 🧪 Testing

```
__tests__/
├── components/    # Component unit tests
├── hooks/         # Hook tests
└── services/      # Service/API mock tests
```

```tsx
// __tests__/components/MyButton.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { MyButton } from '@/components/ui/MyButton';

it('calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(<MyButton title="Click" onPress={onPress} />);
  fireEvent.press(getByText('Click'));
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start on VPS with tunnel (recommended)
npx expo start --tunnel

# Start locally
npx expo start

# Build for production
eas build --platform android
eas build --platform ios
```

---

## 🔄 Git Conventions

### Branch naming
```
feature/login-screen
fix/crash-on-startup
chore/update-dependencies
refactor/auth-service
```

### Commit messages (Conventional Commits)
```
feat: add login screen
fix: resolve crash on Android 12
chore: upgrade expo sdk to 51
refactor: extract auth logic to service
docs: update AGENT.md
```

---

## ✅ Pre-commit Checklist

- [ ] No `any` types used
- [ ] All components have proper TypeScript types
- [ ] No API calls directly inside components
- [ ] No hardcoded colors or strings
- [ ] New features have at least one test
- [ ] `.env` is not committed
- [ ] `npm run lint` passes with no errors

---

## ❌ Anti-patterns to Avoid

| Avoid | Use instead |
|-------|-------------|
| `any` type | `unknown` or proper type |
| Inline API calls in components | `/services` layer |
| Hardcoded colors | `constants/colors.ts` |
| `console.log` in production | Remove or use logger |
| Anonymous default exports | Named exports |
| Business logic in components | Custom hooks or services |

---

*Last updated: 2025 — Keep this file up to date as the project evolves.*
