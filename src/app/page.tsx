'use client'; // This directive is required because we are using client-side hooks (useEffect, useRouter) and localStorage.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from "@/components/HomePage/HomePage"; 
export default function Home() {
  // Initialize the Next.js router for navigation.
  const router = useRouter();

  // useEffect runs once after the component mounts on the client-side.
  useEffect(() => {
    // Check if the 'hasVisitedBefore' flag exists in the browser's local storage.
    const hasVisited = localStorage.getItem('hasVisitedBefore');

    // If the flag is not found (!hasVisited), it means this is the user's first visit.
    if (!hasVisited) {
      // 1. Set the flag in localStorage to 'true' so this logic won't run on their next visit.
      localStorage.setItem('hasVisitedBefore', 'true');
      
      // 2. Programmatically redirect the user to the '/features' page.
      router.push('/features');
    }

    // If the flag *does* exist, this 'if' block is skipped, and the component proceeds to render the normal home page below.
  }, [router]); // The dependency array ensures this effect runs only once.

  // This is the normal home page UI that will be shown to returning visitors.
  return <HomePage />;
}