"use client";

import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import TopNavigation from "@/components/navigations/TopNavigation";
import Footer from "@/components/footers/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import AboutUs from "@/components/sections/AboutUs";
import ContactUs from "@/components/sections/ContactUs";
import AuthModal from "@/components/forms/AuthModal";
import { useState } from "react";



export default function Home() {
    // const [open, setOpen] = useState(true);

  return (
    <main className="overflow-hidden bg-background text-foreground">

        {/* <AuthModal open={open} onClose={() => setOpen(false)} defaultMode="login" /> */}

      {/* =================================
      
          NAVIGATION
      ================================= */}

      <TopNavigation/>


      {/* =================================
          HERO SECTION
      ================================= */}

      <Hero />


      {/* =================================
          SERVICES SECTION
      ================================= */}

      <Services />


      {/* =================================
          ABOUT SECTION
      ================================= */}

      <AboutUs />


      {/* =================================
          TECHNOLOGIES SECTION
      ================================= */}

      <Technologies />


      {/* =================================
          CONTACT CTA
      ================================= */}

      <ContactUs />


      {/* =================================
          FOOTER
      ================================= */}

      <Footer />

    </main>
  );
}
