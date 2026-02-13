import type { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Home | My App",
  description: "Home page of My App",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <main style={{ }}>
        {children}  
      </main>
    </>
  );
}
