# 09 — Quality Assurance & Testing Plan: Shank's Code

This document outlines the testing strategy, validation matrices, responsive verification standards, and acceptance criteria for all implementations.

---

## 1. Automated Verification & Build Integrity

Every implementation task must pass the production build pipeline before being accepted:

```powershell
npm --prefix client run build
```

### Verification Criteria
1. **Zero TypeScript Errors**: No type mismatches, missing properties, unhandled union types, or implicit `any`.
2. **Zero Missing Imports**: All asset references, subcomponents, and utility helpers must resolve.
3. **No Dead Bundle Bloat**: Verify bundle size remains optimal and free of unapproved heavy dependencies.

---

## 2. Responsive Viewport Test Matrix

Every page and component must be validated across the standard responsive spectrum:

| Device Category | Target Viewport Widths | Critical Inspection Points |
|---|---|---|
| **Mobile** | `375px`, `390px`, `412px` | - Zero horizontal scrolling (`overflow-x: hidden`).<br>- Collapsible mobile navigation menu operates smoothly.<br>- Touch targets are at least 44x44px.<br>- Multi-column grids collapse to single-column stacks. |
| **Tablet** | `768px`, `1024px` | - 2-column card layouts render evenly.<br>- Sidebar collapses or toggles cleanly on tablet breakpoints.<br>- Tables scroll horizontally if necessary or render compact cards. |
| **Desktop** | `1280px`, `1440px`, `1920px` | - Max-width container (`max-w-7xl`) centers content gracefully without awkward whitespace stretching.<br>- Multi-column dashboards, calendars, and syllabus lists render with proper spacing. |

---

## 3. Four-State Asynchronous Validation

Every data-dependent view must be verified against all four UI states:

```
[Loading Skeleton] ──► [Success Data View]
         │
         ├──► [Empty State Card]
         │
         └──► [Error State Alert + Retry Action]
```

- **Loading State**: Test with simulated delay to verify skeletons maintain the exact layout geometry of loaded cards to prevent layout shift (CLS).
- **Success State**: Verify that realistic, formatted data populates accurately.
- **Empty State**: Verify appropriate empty illustration/icon and guidance when data arrays return `[]`.
- **Error State**: Verify explicit error banner/card with actionable retry button.

---

## 4. API Mode Verification (Mock vs. Live)

### Test Case MOCK-01: Mock Mode Validation
- Set `VITE_API_MODE=mock` in `.env`.
- Ensure all public pages and student portal views load sample data cleanly without console errors or backend dependencies.

### Test Case LIVE-01: Zero Silent Fallback Assertion
- Set `VITE_API_MODE=live` and `VITE_API_BASE_URL=http://localhost:5000/api`.
- Leave the Express backend stopped (offline).
- Navigate to an API-dependent student view (e.g., `/student/courses`).
- **Pass Condition**: The page displays a visible `ErrorState` ("Unable to connect to server. Please check your connection.") with a "Retry" button.
- **Fail Condition**: The page silently renders mock data or crashes with an unhandled exception.

---

## 5. Accessibility & Contrast Standards

- **Color Contrast**: All primary text (`#0F172A`) against light backgrounds (`#FFFFFF`, `#F8FAFC`) must exceed WCAG AA ratio (min 4.5:1, typically >12:1).
- **Focus Rings**: All interactive buttons, inputs, and links must exhibit visible `focus:ring-2 focus:ring-blue-500` rings on keyboard tab navigation.
- **Semantic Structure**: Proper HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<h1>` to `<h4>`).
