# FocusBoard – Productivity Dashboard

A fully client-side productivity app built with Vanilla JS, SCSS, and modern Web APIs. No frameworks, no build tools beyond SCSS compilation — just well-structured vanilla code.

🔗 **Live:** https://focusboardd.netlify.app/

---

## Preview

### Auth Gate
![Auth Gate](./screenshorts/Screenshot%202026-05-24%20114910.png)
Login/Register card centered on a full-screen background using existing CSS variables — theme switches apply here too. Tab switching between Login and Register is handled without a page reload; the confirm field slides in only on Register.

### Dashboard
![Dashboard](./screenshorts/Screenshot%202026-05-24%20114935.png)
The main landing view after login. Weather, live clock, and location fetched via Geolocation + WeatherAPI on demand (user triggers it — no background polling). Background is a random Picsum image on each load. Theme switcher orbits the bottom-right corner of the showcase grid. Logout sits fixed bottom-right, low opacity so it stays out of the way.

### Task Planner
![Task Planner](./screenshorts/Screenshot%202026-05-24%20115003.png)
Two-column layout — form on the left, live task list on the right. Important tasks float to the top via a client-side sort before render. Pending and Completed are split into separate lists. Add Task button stays disabled until both title and description have content.

### Time Blocking
![Time Blocking](./screenshorts/Screenshot%202026-05-24%20115017.png)
24 hourly slots rendered in a two-column grid. Each slot is an input that auto-saves on every keystroke via a single delegated listener on the wrapper — no 24 individual listeners. Values persist across sessions.

### Kanban Board
![Kanban Board](./screenshorts/Screenshot%202026-05-24%20115032.png)
Three columns: To Do, In Progress, Done. Cards are draggable using the native HTML5 Drag and Drop API. Column state is stored per card so a refresh restores exact positions. The Add Task overlay blurs the board behind it. Task counters in each column header update on every render.

### Pomodoro Timer
![Pomodoro Timer](./screenshorts/Screenshot%202026-05-24%20115045.png)
25-minute work / 5-minute break cycle. Timer state (remaining seconds + current mode) is written to localStorage on every tick so a page refresh doesn't lose progress. Study animation plays on the left panel alongside the controls.

### Sticky Notes
![Sticky Notes](./screenshorts/Screenshot%202026-05-24%20115056.png)
Masonry layout via CSS `column-width` — no JS grid logic. Notes are live-editable inline; title and body save on every input event. Search filters across both title and body in real time. Add and delete without any form submission.

---

## Auth (Client-Side)

Authentication is a self-contained `authPage()` function that owns everything: the `AUTH` storage object, all UI helpers, and event listeners. Same module pattern as every other feature — one function, called once, no globals leaking out except `window.authLogout` and `window.authSwitchTab` which are explicitly exposed for the HTML `onclick` attributes.

**How it works:**
- Users stored as a JSON array in `localStorage` under a namespaced key
- Sessions use `sessionStorage` (tab-scoped, clears on close) — a shared machine won't stay logged in between browser sessions
- On load, `<main>` and the logout button are hidden immediately via `hideApp()`. If a valid session exists, they're shown without touching the auth gate at all
- Tab switching clears error, success, and strength indicator messages together so no stale feedback carries over

**Password validation (register only):**
- Minimum 8 characters, at least one uppercase letter, at least one special character
- Live feedback as the user types — weak / almost / strong — via `checkStrength()` on the password `input` event
- Strength indicator clears when the user moves to the confirm field so it doesn't show against an already-valid password
- On submit, `checkStrength` runs once more as a hard gate before the register call goes through

**Why not a real backend?** Passwords are stored plain text in localStorage — fine for a local productivity tool, not for anything with real user data. A production version would replace `AUTH` with API calls to a server handling hashed passwords, JWTs, and proper session management.

---

## Project Structure

```
focusboard/
├── index.html
├── style.css          # compiled from SCSS
├── script.js          # all feature modules
├── scss/
│   ├── _auth.scss
│   └── ...
└── assets/
```

---

## Tech

- HTML5
- SCSS — variables, nesting, `&` modifiers, media queries co-located with components
- Vanilla JavaScript — no frameworks, no bundler
- Web APIs: localStorage, sessionStorage, Fetch, Geolocation, HTML5 Drag and Drop
- Deployed on Netlify

---

## What This Covers

- Modular vanilla JS architecture (one function per feature, self-contained)
- Event delegation over per-element listeners
- State-driven rendering — no direct DOM mutation outside render functions
- CSS custom property theming with zero JS style writes
- Client-side auth pattern and its tradeoffs
- Real-time input validation with progressive feedback
- API integration (weather, quotes)
- Persistent state across sessions without a database