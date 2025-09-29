"use client";

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

export interface UserData {
  id: string;
  email: string;
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from secure API endpoint
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'same-origin'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const supabase = createClient();

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      clearTimeout(timeout);

      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch complete user data including role from secure API
        await fetchUserData();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    // Initial auth check
    fetchUserData();

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}