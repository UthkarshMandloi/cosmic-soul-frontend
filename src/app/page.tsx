'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from "@/components/HomePage/HomePage"; // Assuming your main home page UI is in this component

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the 'hasVisited' flag exists in localStorage
    const hasVisited = localStorage.getItem('hasVisitedBefore');

    // If it does NOT exist, it's the user's first time
    if (!hasVisited) {
      // 1. Set the flag so this doesn't run again
      localStorage.setItem('hasVisitedBefore', 'true');
      
      // 2. Redirect the user to the features page
      router.push('/features');
    }
    // If the flag exists, do nothing and show the normal home page.
  }, [router]); // The dependency array ensures this runs only once on mount

  // This is the normal home page UI for returning visitors
  return <HomePage />;
}