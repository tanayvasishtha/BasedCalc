# Complete Step-by-Step Guide: Real-Time Donation Setup

This guide will walk you through setting up real-time donation tracking with Buy Me a Coffee.

## Prerequisites

- Node.js installed (v18 or higher)
- A Vercel account (free tier works)
- A Buy Me a Coffee account
- Git installed

---

## Step 1: Install Vercel CLI

Open your terminal and run:

```bash
npm install -g vercel
```

Or if you prefer using npx (no global install needed):
```bash
npx vercel@latest
```

---

## Step 2: Install Required Dependencies

In your project root, install the Vercel Node.js types:

```bash
npm install --save-dev @vercel/node
```

Or if using TypeScript types:
```bash
npm install --save-dev @vercel/node @types/node
```

---

## Step 3: Verify API Function

Make sure the `api/donations.ts` file exists in your project. It should look like this:

```typescript
// api/donations.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const donations: Array<{
  name: string;
  amount: number;
  timestamp: number;
  supporter_email?: string;
}> = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    
    const now = Date.now();
    const formattedDonors = donations
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
      .map(donor => {
        const secondsAgo = Math.floor((now - donor.timestamp) / 1000);
        let timeAgo = '';
        
        if (secondsAgo < 60) timeAgo = 'Just now';
        else if (secondsAgo < 3600) timeAgo = `${Math.floor(secondsAgo / 60)} minutes ago`;
        else if (secondsAgo < 86400) timeAgo = `${Math.floor(secondsAgo / 3600)} hours ago`;
        else timeAgo = `${Math.floor(secondsAgo / 86400)} days ago`;
        
        return {
          name: donor.name || 'Anonymous',
          amount: donor.amount,
          timeAgo,
        };
      });

    return res.status(200).json({
      total,
      donors: formattedDonors,
    });
  }

  if (req.method === 'POST') {
    try {
      const { supporter_name, supporter_email, amount, payment_date } = req.body;

      if (amount && payment_date) {
        donations.push({
          name: supporter_name || 'Anonymous',
          amount: parseFloat(amount),
          timestamp: new Date(payment_date).getTime() || Date.now(),
          supporter_email,
        });

        if (donations.length > 100) {
          donations.shift();
        }

        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Invalid payload' });
    } catch (error) {
      console.error('Webhook error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
```

---

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. **Login to Vercel:**
   ```bash
   vercel login
   ```
   This will open your browser to authenticate.

2. **Link your project:**
   ```bash
   vercel link
   ```
   - Select your scope (your account)
   - Select "Link to existing project" or "Create new project"
   - Enter project name (e.g., "basedcalc")

3. **Deploy:**
   ```bash
   vercel --prod
   ```
   Or just:
   ```bash
   vercel
   ```
   (Use `--prod` for production, without it for preview)

4. **Copy the deployment URL:**
   After deployment, Vercel will show you a URL like:
   ```
   https://basedcalc-xyz123.vercel.app
   ```
   Your API will be at: `https://basedcalc-xyz123.vercel.app/api/donations`

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository (or upload files)
4. Vercel will auto-detect and deploy
5. Your API will be at: `https://your-project.vercel.app/api/donations`

---

## Step 5: Test the API

Test that your API is working:

### Test GET endpoint (should return empty data initially):
```bash
curl https://your-project.vercel.app/api/donations
```

Or open in browser:
```
https://your-project.vercel.app/api/donations
```

You should see:
```json
{
  "total": 0,
  "donors": []
}
```

### Test POST endpoint (simulate a donation):
```bash
curl -X POST https://your-project.vercel.app/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "supporter_name": "Test Donor",
    "amount": "25.00",
    "payment_date": "2025-01-15T10:00:00Z"
  }'
```

Then test GET again - you should see the test donation!

---

## Step 6: Configure Buy Me a Coffee Webhook

### Step 6.1: Find Your BMC Webhook Settings

1. Go to [buymeacoffee.com](https://buymeacoffee.com) and sign in
2. Navigate to: **Settings → Extras → Webhooks** (or **Settings → Integrations**)
3. If you don't see webhooks, check **Developer** or **API** sections

### Step 6.2: Add Webhook URL

1. Click **"Add Webhook"** or **"Create Webhook"**
2. Enter your webhook URL:
   ```
   https://your-project.vercel.app/api/donations
   ```
   (Replace with your actual Vercel URL)

3. Select events to listen for:
   - ✅ **New Support** (when someone donates)
   - ✅ **Payment Received**

4. Save the webhook

### Step 6.3: Verify Webhook Format

Buy Me a Coffee webhook payload format may vary. Update `api/donations.ts` POST handler if needed:

**Common BMC webhook fields:**
- `supporter_name` or `name`
- `supporter_email` or `email`
- `amount` or `payment_amount`
- `payment_date` or `created_at`
- `payment_id`

**To debug, add logging:**
```typescript
if (req.method === 'POST') {
  console.log('Webhook received:', JSON.stringify(req.body, null, 2));
  // ... rest of code
}
```

Check Vercel logs: `vercel logs` or in Vercel dashboard → Functions → Logs

---

## Step 7: Update Frontend Configuration

### Option A: Environment Variable (Recommended)

1. Create `.env` file in project root:
   ```
   VITE_DONATIONS_API_URL=https://your-project.vercel.app/api/donations
   ```

2. Restart your dev server:
   ```bash
   npm run dev
   ```

### Option B: Direct Update

Edit `src/hooks/useDonations.ts` line 19:

```typescript
const DONATIONS_API_URL = 
  import.meta.env.VITE_DONATIONS_API_URL || 
  'https://your-project.vercel.app/api/donations'; // ← Update this
```

Replace `your-project.vercel.app` with your actual Vercel URL.

---

## Step 8: Test the Full Flow

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Check the browser console:**
   - Open DevTools (F12)
   - Check Network tab for API calls to `/api/donations`
   - Should see requests every 30 seconds

3. **Test a real donation:**
   - Make a test donation on Buy Me a Coffee
   - Wait 30 seconds (or refresh the page)
   - The progress bar and recent donors should update!

---

## Step 9: Production Deployment

### Deploy Frontend to Vercel:

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add real-time donation tracking"
   git push origin main
   ```

2. **Deploy frontend:**
   ```bash
   vercel --prod
   ```

3. **Set environment variable in Vercel dashboard:**
   - Go to Vercel project settings
   - Environment Variables
   - Add: `VITE_DONATIONS_API_URL` = `https://your-project.vercel.app/api/donations`
   - Redeploy

---

## Troubleshooting

### Issue: API returns 404
- **Solution:** Make sure `api/donations.ts` is in the `api/` folder at project root
- Check `vercel.json` exists and is correct

### Issue: CORS errors
- **Solution:** The API already handles CORS. If issues persist, check Vercel function logs

### Issue: Webhook not receiving data
- **Solution:** 
  1. Check Buy Me a Coffee webhook logs/status
  2. Check Vercel function logs: `vercel logs`
  3. Verify webhook URL is correct
  4. Test manually with curl (see Step 5)

### Issue: Data resets on serverless restart
- **Solution:** This is expected with in-memory storage. For production, use a database:
  - Vercel KV (Redis)
  - Supabase
  - Firebase
  - MongoDB Atlas

### Issue: Frontend not updating
- **Solution:**
  1. Check browser console for errors
  2. Verify API URL in `.env` or `useDonations.ts`
  3. Check Network tab - API should return 200 status
  4. Wait 30 seconds for polling interval

---

## Next Steps (Optional - Production)

### Use a Database (Recommended for Production)

The current setup uses in-memory storage, which resets on serverless function restarts. For production, use a database:

**Option 1: Vercel KV (Easiest)**
```bash
npm install @vercel/kv
```

**Option 2: Supabase**
```bash
npm install @supabase/supabase-js
```

**Option 3: Firebase**
```bash
npm install firebase
```

See `DONATION_SETUP.md` for database implementation examples.

---

## Summary Checklist

- [ ] Installed Vercel CLI
- [ ] Installed `@vercel/node` dependency
- [ ] Verified `api/donations.ts` exists
- [ ] Deployed to Vercel
- [ ] Tested GET endpoint (returns JSON)
- [ ] Tested POST endpoint (can add donations)
- [ ] Configured Buy Me a Coffee webhook
- [ ] Updated frontend API URL
- [ ] Tested full flow with real donation
- [ ] Deployed frontend to production

---

## Quick Reference

**API Endpoint:** `https://your-project.vercel.app/api/donations`

**Frontend polling:** Every 30 seconds

**Webhook URL for BMC:** `https://your-project.vercel.app/api/donations`

**Environment Variable:** `VITE_DONATIONS_API_URL`

---

Need help? Check Vercel logs: `vercel logs` or visit [Vercel Dashboard](https://vercel.com/dashboard)

