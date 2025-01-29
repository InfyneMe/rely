"use client";
import React, { useState } from "react";
import {
  Mail,
  WalletCards,
  CalendarCheck2,
  Play,
  Car,
  Bell,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const words = [
    {
      text: "Effortless",
      className: "text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500",
    },
    {
      text: "FOCUS.",
      className:
        "text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500",
    },
  ];

  const features = [
    {
      icon: <Bell className="w-6 h-6" />,
      text: "Smart vehicle maintenance reminders",
    },
    { icon: <Car className="w-6 h-6" />, text: "Instant ride booking service" },
    { icon: <Clock className="w-6 h-6" />, text: "Real-time tracking updates" },
    { icon: <Shield className="w-6 h-6" />, text: "Secure payment processing" },
  ];

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoading(true);
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeResponse }),
      });
      const data = await response.json();
      console.log(data);
      router.push("/dashboard");
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {loading && (
        <LoadingSpinner message="Verifying your data please wait..." />
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-blue-500/[0.03] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            <div className="inline-block animate-float">
              <span className="inline-flex items-center px-6 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                🚀 Welcome to the Future of Vehicle Management
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <h1 className="font-poppins tracking-wide font-extrabold text-center text-4xl md:text-6xl lg:text-7xl">
                Relyx <span className="text-blue-600">-Timely Reminders</span>
              </h1>

              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full opacity-0"></div>

              <div className="flex justify-center items-center">
                <TypewriterEffectSmooth
                  words={words.map((item) => ({
                    ...item,
                    className:
                      "text-black font-extrabold text-4xl md:text-5xl lg:text-6xl",
                  }))}
                />
              </div>
            </div>

            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Empowering you to make every moment count with intelligent vehicle
              management and seamless ride-booking experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all transform hover:scale-105"
                onClick={() => login()}
              >
                <Play className="mr-2" />
                Get Started Now
                <ArrowRight className="ml-2" />
              </Button>

              <Button
                variant="outline"
                className="px-8 py-6 rounded-full text-lg font-medium border-2 hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <p className="text-gray-700 font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl p-8 md:p-16 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Seamless Integration
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6" />
                    <span className="text-lg">
                      Add to calendar with one click
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6" />
                    <span className="text-lg">
                      Store in your digital wallet
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6" />
                    <span className="text-lg">Share instantly with teams</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <CalendarCheck2 className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Calendar</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <WalletCards className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Wallet</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium">Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "100K+", label: "Reminders Set" },
              { number: "99%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add this footer section just before the closing div of your main container */}
      <footer className="bg-blue-700 text-gray-300 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Relyx</h2>
              <p className="text-white-400 leading-relaxed">
                Empowering vehicle owners with smart reminders and seamless ride
                management solutions. Your journey, our priority.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Our Services
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Vehicle Reminders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ride Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Maintenance Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Digital Wallet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    24/7 Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Stay Updated
              </h3>
              <p className="text-white mb-4">
                Subscribe to our newsletter for updates and tips.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
                />
                <button className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm">
                © {new Date().getFullYear()} Relyx. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm md:justify-end">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
