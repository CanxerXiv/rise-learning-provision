# Supabase Connection Setup Guide

Your website needs to connect to your Supabase project. Here's how to set it up:

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard at [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on the **Settings** icon (gear icon) in the left sidebar
4. Click on **API** in the settings menu
5. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 2: Create Your .env File

1. In your project root directory (`/Users/brang/Downloads/Dev/reveal-the-magic-main`), create a new file called `.env`
2. Copy and paste this template:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key-here
```

3. Replace the values:
   - Replace `https://your-project-id.supabase.co` with your actual **Project URL**
   - Replace `your-anon-public-key-here` with your actual **anon public** key

## Step 3: Restart Your Development Server

After creating the `.env` file:

1. Stop your current dev server (press `Ctrl+C` in the terminal where `npm run dev` is running)
2. Start it again: `npm run dev`

## Step 4: Verify Connection

Once your dev server restarts:
- The website should now connect to your Supabase database
- You should be able to see data from your database (once you've run the migrations)
- The admin dashboard should work properly

## Important Notes

- The `.env` file is already in `.gitignore`, so it won't be committed to version control
- Never share your Supabase keys publicly
- The `anon public` key is safe to use in your frontend code
- Make sure you've also run the database migrations from `DATABASE_SETUP.md`

## Troubleshooting

If you still see connection errors:
1. Double-check that your `.env` file is in the project root (same folder as `package.json`)
2. Make sure there are no extra spaces or quotes around the values
3. Verify the keys are correct in your Supabase dashboard
4. Make sure you restarted the dev server after creating the `.env` file
