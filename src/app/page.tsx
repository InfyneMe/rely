"use client";
import { Mail } from "lucide-react";
import { WalletCards } from 'lucide-react';
import { CalendarCheck2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const word = [
    {
      text: 'Effortless',
    }, 
    {
      text: 'FOCUS.',
      color: 'text-blue-500 dark:text-blue-500'
    }
  ];
  const router = useRouter();
  useEffect(() => {
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      router.push('/dashboard');
    }
  }, [router])

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await fetch('/api/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeResponse }),
      });
      const data = await response.json();
      localStorage.setItem('id_token', data.id_token);
      router.push('/dashboard');
    },
    flow: 'auth-code',
    
    scope: 'https://www.googleapis.com/auth/calendar',
  });

  return (
    <div className="place-items-center min-h-screen p-8 sm:p-20 text-center space-y-6 space-y-4" style={{marginTop: '10rem'}}>
      <span className="font-poppins tracking-wide font-extrabold text-center md:text-6xl lg:text-8xl xl:text-6xl">
        Relyx -Timely Reminders, 
      </span>
      <TypewriterEffectSmooth
        words={word.map((item) => ({
          ...item,
          className: item.color || 'text-black font-extrabold',
        }))}
      />
      <span className="text-base md:text-lg font-light mt-4">
        Empowering you to make every moment count.
      </span>
      <Button className="flex items-center justify-center" onClick={() => login()}>
          <Play className="mr-2" />
          Getting Started
      </Button>
      <span className="flex justify-center items-center space-x-3 text-sm md:text-sm font-bold">
        <CalendarCheck2 className="h-5 w-5" />
        <span className="ml-2">Add to calendar,</span>
        <WalletCards className="h-5 w-5" />
        <span className="ml-2">Add to wallet, and</span>
        <Mail className="h-5 w-5" />
        <span className="ml-2">share with ease</span>
      </span>
    </div>
  );
}
