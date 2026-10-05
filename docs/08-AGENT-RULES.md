# 08 — AI Agent Rules of Engagement: Shank's Code

This document outlines the strict behavioral constraints, coding standards, and operational guidelines for all AI pair programming agents working within the Shank's Code codebase.

---

## 1. Role & Scope Authority

1. **Implementation Agent, Not Product Owner**:
   - You determine **HOW** to implement approved requirements cleanly, efficiently, and safely.
   - You do **NOT** determine **WHAT** the platform should contain.
   - **Do not implement features merely because they appear in another planning document.**
   - You must never invent unapproved features (e.g., payment gateways, coupons, certificates, admin dashboards, leave workflows, or predictive analytics).
2. **Authoritative Hierarchy**:
   The authoritative hierarchy of project documentation is:
   1. **Human-approved requirements**
   2. `docs/03-FEATURE-SPEC.md`
   3. `docs/02-PAGE-MAP.md`
   4. `docs/04-USER-FLOWS.md`
   5. `docs/07-API-CONTRACT.md`
   6. `docs/05-DESIGN-SYSTEM.md`
   7. `docs/06-FRONTEND-ARCHITECTURE.md`
   8. `docs/08-AGENT-RULES.md`
   9. **Other planning / proposal documents**
   - If requirements conflict, **STOP and request human clarification** rather than silently choosing an interpretation.

---

## 2. Incremental Development Lifecycle

Never attempt to build large swathes of the platform in one operation. Always execute tasks sequentially using the validated loop:

```
PLAN → IMPLEMENT → RUN → TEST → REVIEW → FIX → ACCEPT → NEXT TASK
```

For every assigned task:
1. **Inspect**: Read relevant documentation and verify existing code.
2. **Isolate**: Implement only the single approved page or component.
3. **Preserve**: Never break or delete existing working functionality.
4. **Validate**: Execute TypeScript type checks and production build (`npm run build`).
5. **Report**: Deliver a concise status report before requesting the next task.

---

## 3. Strict Coding & Architecture Standards

### A. TypeScript Discipline
- **100% TypeScript**: All client files must be `.ts` or `.tsx`.
- **No `any` Escapes**: Use explicit types, interfaces, and union types.
- **No `.js` / `.jsx`**: Plain JavaScript files in the client are strictly prohibited.

### B. Visual Identity Adherence
- Follow `05-DESIGN-SYSTEM.md` exclusively:
  - **Light-first**: White cards (`#FFFFFF`) on soft neutral canvas (`#F8FAFC`, `#F1F5F9`).
  - **Deep Navy** (`#0F172A`, `#1E293B`) headers and brand elements.
  - **Electric Blue** (`#2563EB`) interactive CTAs and active states.
  - **No Dark Mode**: Never introduce dark mode styles, theme toggles, or CSS variables for theming.
  - **No Excessive Effects**: Avoid heavy glassmorphism, neon glows, and distracting animations.

### C. Explicit API Mode Discipline
- Check `VITE_API_MODE`:
  - When `mock`: Fetch strictly from typed `src/mocks/`.
  - When `live`: Fetch strictly from `VITE_API_BASE_URL`.
- **Zero Silent Fallback**: If an API request fails in live mode, **render an ErrorState**. NEVER silently switch to mock data on network error.

---

## 4. Definition of Done (DoD) Checklist

A task is considered complete **ONLY** when:
- [ ] Requested feature functions correctly and matches the approved specification.
- [ ] UI strictly complies with the Shank's Code Light-First Design System.
- [ ] Existing functionality remains unbroken and fully operational.
- [ ] No unrelated files were modified or deleted.
- [ ] No unnecessary or unapproved dependencies were introduced.
- [ ] TypeScript compilation passes with zero errors.
- [ ] Production build (`npm run build`) executes cleanly with exit code 0.
- [ ] All four UI states (Loading, Success, Empty, Error) are handled where asynchronous data is displayed.
- [ ] Responsive design functions without horizontal overflow across mobile (375px), tablet (768px), and desktop (1280px+).
- [ ] Basic accessibility standards (semantic HTML, visible focus states, alt text) are met.

---

## 5. Post-Task Reporting Format

After completing any task, the agent must output a concise summary:
1. **Implemented**: Summary of the feature or page completed.
2. **Files Created**: Clickable markdown links to new files.
3. **Files Modified**: Clickable markdown links to modified files.
4. **Dependencies**: Any packages added (along with justification).
5. **Validation Performed**: Build output status and verification results.
6. **Next Recommended Task**: The single logical next step for human approval.
