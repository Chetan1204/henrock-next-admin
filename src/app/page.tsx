// src/app/page.tsx
"use client"; // This directive tells Next.js to treat this as a client component
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from "../components/Loader";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to /parents if the token exists
      router.push('/doctors');
    }else{
      router.push('/doctors/login');
    }
  }, [router]);

  return null;
};

export default Home;

