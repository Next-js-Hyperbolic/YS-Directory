import React, { Component } from 'react';
import Navbar from '../../components/Navbar';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <Navbar />
      {children}
    </main>
  );
}
