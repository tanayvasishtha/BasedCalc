import { useState, useEffect } from 'react';

interface Donor {
  name: string;
  amount: number;
  timeAgo: string;
}

interface DonationData {
  total: number;
  donors: Donor[];
}

// API endpoint - Update this to your deployed serverless function URL
// For local dev: http://localhost:3000/api/donations
// For production: https://your-domain.vercel.app/api/donations
const DONATIONS_API_URL: string | undefined = import.meta.env.VITE_DONATIONS_API_URL;

export const useDonations = () => {
  const [donationData, setDonationData] = useState<DonationData>({
    total: 0,
    donors: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = async () => {
    // If no API URL configured, seed with a simple dummy donation
    if (!DONATIONS_API_URL) {
      setDonationData({
        total: 10,
        donors: [
          { name: 'sukhanishri', amount: 10, timeAgo: 'Just now' },
        ],
      });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(DONATIONS_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache busting for real-time updates
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch donations: ${response.statusText}`);
      }

      const data = await response.json();
      setDonationData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch donations');
      // Don't clear existing data on error, just log it
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchDonations();

    if (!DONATIONS_API_URL) return; // no polling without API

    // Poll every 30 seconds for real-time updates
    const interval = setInterval(fetchDonations, 30000);
    return () => clearInterval(interval);
  }, []);

  return { donationData, loading, error, refetch: fetchDonations };
};

