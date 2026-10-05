# 05 — Design System & Component Guidelines: Shank's Code

This document defines the **visual tokens, color system, typography, spacing, and component guidelines** for the Shank's Code platform. All frontend user interfaces must strictly adhere to these specifications.

---

## 1. Visual Direction & Design Philosophy

Shank's Code is built with a **light-first interface** that radiates clarity, professional engineering discipline, and focused readability.

### Core Visual Principles
1. **Light-First Surfaces**: Clean white `#FFFFFF` cards resting on soft neutral `#F8FAFC` and `#F1F5F9` canvas backgrounds.
2. **Authoritative Typography**: Deep Navy for headings and primary copy gives content institutional weight and high contrast.
3. **Focused Interactivity**: Electric Blue for interactive elements, focus rings, primary action buttons, and active tabs.
4. **Semantic Restraint**: Emerald, Amber, and Rose are reserved strictly for functional feedback (success, warnings, critical alerts, and timers).
5. **No Visual Gimmicks**:
   - ❌ NO Dark Mode or Theme Switchers.
   - ❌ NO Excessive Glassmorphism or heavy backdrop blurs.
   - ❌ NO Neon glows, laser borders, or jarring flashing elements.
   - ❌ NO Distracting floating animations that impede usability.

---

## 2. Design Tokens & Color Palette

### A. Neutral Surfaces & Backgrounds
| Token Name | Hex Code | Tailwind Utility | Primary Usage |
|---|---|---|---|
| `surface-canvas` | `#F8FAFC` | `bg-slate-50` | Primary app & page backdrop |
| `surface-subtle` | `#F1F5F9` | `bg-slate-100` | Section dividers, table header backgrounds |
| `surface-card` | `#FFFFFF` | `bg-white` | Cards, modals, dropdowns, input fields |
| `border-subtle` | `#F1F5F9` | `border-slate-100` | Micro-dividers, inner card rows |
| `border-default`| `#E2E8F0` | `border-slate-200` | Standard card borders, input borders |
| `border-strong` | `#CBD5E1` | `border-slate-300` | Active input borders, table borders |

### B. Brand & Primary Colors (Deep Navy)
| Token Name | Hex Code | Tailwind Utility | Primary Usage |
|---|---|---|---|
| `navy-950` | `#0A0F1D` | `text-slate-950` | Deepest headings, hero titles |
| `navy-900` | `#0F172A` | `bg-slate-900`, `text-slate-900` | Primary brand color, headers, navbar elements |
| `navy-800` | `#1E293B` | `text-slate-800` | Body titles, secondary brand elements |
| `navy-600` | `#475569` | `text-slate-600` | Standard body copy, readable paragraphs |
| `navy-400` | `#94A3B8` | `text-slate-400` | Muted labels, secondary meta-information |

### C. Interactive & Accent Colors (Electric Blue)
| Token Name | Hex Code | Tailwind Utility | Primary Usage |
|---|---|---|---|
| `blue-600` | `#2563EB` | `bg-blue-600`, `text-blue-600` | Primary buttons, active tabs, progress bars |
| `blue-700` | `#1D4ED8` | `bg-blue-700`, `hover:bg-blue-700` | Button hover and pressed states |
| `blue-500` | `#3B82F6` | `bg-blue-500`, `focus:ring-blue-500`| Focus rings, subtle accent icons |
| `blue-50` | `#EFF6FF` | `bg-blue-50`, `text-blue-700` | Active menu pill backgrounds, badges |

### D. Semantic Status Colors (Used Strictly for Feedback)
| State | Light Background | Border Token | Text Token | Usage |
|---|---|---|---|---|
| **Success** | `#ECFDF5` (`bg-emerald-50`) | `#A7F3D0` (`border-emerald-200`) | `#059669` (`text-emerald-700`) | Completed lessons, passed exams, present attendance |
| **Warning** | `#FFFBEB` (`bg-amber-50`) | `#FDE68A` (`border-amber-200`) | `#D97706` (`text-amber-700`) | In-progress assessments, approaching lecture |
| **Danger** | `#FFF1F2` (`bg-rose-50`) | `#FECDD3` (`border-rose-200`) | `#E11D48` (`text-rose-700`) | Exam countdown timer (<5m), failed grades, errors |

---

## 3. Typography & Hierarchy

The platform uses **Inter** (with clean system font fallbacks) across all UI layers.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Scale & Weight Standards
| Level | Tailwind Classes | Size / Line Height | Weight | Typical Element |
|---|---|---|---|---|
| Display | `text-4xl lg:text-5xl font-extrabold tracking-tight` | 48px–56px / 1.15 | 800 | Hero Section Headline |
| H1 | `text-3xl lg:text-4xl font-bold tracking-tight` | 32px–36px / 1.2 | 700 | Main Page Title, Dashboard Welcome |
| H2 | `text-2xl font-bold tracking-tight` | 24px / 1.3 | 700 | Section Headers, Card Group Titles |
| H3 | `text-lg font-semibold` | 18px / 1.4 | 600 | Card Titles, Modal Headers |
| H4 | `text-base font-semibold` | 16px / 1.4 | 600 | Subsections, Table Column Headers |
| Body Large | `text-lg text-slate-600 leading-relaxed` | 18px / 1.6 | 400 | Hero Subtitle, Lead Paragraphs |
| Body Default | `text-sm text-slate-600 leading-normal` | 14px / 1.5 | 400 | Standard UI Copy, Form Labels, Table Cells |
| Body Small | `text-xs text-slate-500 font-medium` | 12px / 1.4 | 500 | Badges, Timestamp Meta, Breadcrumbs |

---

## 4. Spacing, Elevation & Borders

- **Border Radius**:
  - `rounded-lg` (8px): Inputs, Buttons, Small Badges, Dropdown items.
  - `rounded-xl` (12px): Standard Cards, Modals, Table Containers, Skeletons.
  - `rounded-2xl` (16px): Large Feature Cards, Hero Containers, Dashboard Banners.
  - `rounded-full`: Avatars, Status Pills, Badges.
- **Card Borders & Shadows**:
  - Default: `border border-slate-200 bg-white shadow-sm`
  - Interactive Hover: `hover:border-slate-300 hover:shadow-md transition-all duration-200`
- **Subtle Gradient Accent**:
  - Subtle top-to-bottom surface sheen: `bg-gradient-to-b from-white to-slate-50`
  - Hero accent gradient: `from-slate-900 via-blue-950 to-slate-900 text-white` (used sparingly in high-impact hero banners).

---

## 5. Standard Component Specifications

### Button (`Button.tsx`)
- **Primary**: `bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-colors rounded-lg font-medium`
- **Secondary / Outline**: `bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors rounded-lg font-medium`
- **Ghost**: `text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors`
- **Danger**: `bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 rounded-lg transition-colors`
- **States**: Includes accessible `disabled:opacity-50 disabled:cursor-not-allowed` and integrated loading spinner state.

### Card (`Card.tsx`)
- Standardized container with `bg-white rounded-xl border border-slate-200 shadow-sm p-6`.

### Input (`Input.tsx`)
- `bg-white border border-slate-200 text-slate-900 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all`.
- Integrated support for label, helper text, left/right icons, and error messages (`text-rose-600 text-xs mt-1`).

### Badge (`Badge.tsx`)
- Compact pill element with `px-2.5 py-0.5 rounded-full text-xs font-medium`.
- Variants: `default` (slate), `primary` (blue), `success` (emerald), `warning` (amber), `danger` (rose).

### Modal (`Modal.tsx`)
- Accessible dialog overlay (`fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4`).
- Card container with header, close button, scrollable body, and action footer.
- Keyboard support: `Escape` key closes the modal.
