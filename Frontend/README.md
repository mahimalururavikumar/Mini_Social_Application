# Social app - frontend

React (Vite) + MUI (app shell/auth) + React Bootstrap (feed) client for the mini social post app.

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend
npm run dev             # http://localhost:5173
```

## Assumptions about the backend contract

Built against these endpoints - adjust `src/api/axios.js` calls if your backend differs:

| Action | Request | Expected response |
|---|---|---|
| Register | `POST /auth/register` (JSON or multipart with `avatar`) | `{ token, user }` |
| Login | `POST /auth/login` `{ email, password }` | `{ token, user }` |
| Get profile | `GET /auth/profile` | `{ user }` |
| Update profile | `PUT /auth/profile` (JSON or multipart) | `{ user }` |
| Feed | `GET /posts?cursor=` | `{ posts, nextCursor, hasMore }` **or** a plain array (both are handled - see `normalizeFeedResponse` in `pages/Feed.jsx`) |
| Create post | `POST /posts` (multipart: `text?`, `image?`) | `{ post }` |
| Like/unlike | `POST /posts/:id/like` | `{ likes: [...usernames] }` |
| Comment | `POST /posts/:id/comment` `{ text }` | `{ comments: [...] }` |
| Delete post | `DELETE /posts/:id` | 200 on success |

Each post object is expected to look like:
```json
{
  "_id": "...",
  "username": "jane",
  "user": "<userId>",
  "text": "...",
  "imageUrl": "...",
  "likes": ["jane", "bob"],
  "comments": [{ "_id": "...", "username": "bob", "text": "...", "createdAt": "..." }],
  "createdAt": "..."
}
```

If any field name differs on your actual backend, the two places to adjust are `PostCard.jsx` (rendering) and `CreatePost.jsx` / `Feed.jsx` (requests).

## Design

- Dark theme inspired by the TaskPlanet social page reference: near-black background, warm gold accent for primary actions.
- Poppins for names/headings, Inter for body text.
- MUI powers the top bar and auth/profile forms; React Bootstrap powers the composer, post cards, and comments.

## Deploying to Vercel / Netlify

1. Push this folder to GitHub as `frontend/`.
2. Import into Vercel/Netlify, root directory `frontend`, build command `npm run build`, output directory `dist`.
3. Set `VITE_API_URL` to your deployed Render backend URL in the project's environment variables.
