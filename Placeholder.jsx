import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').charAt(0).toUpperCase() + location.pathname.slice(2);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Coming Soon: {pageName}</h1>
      <p className="text-slate-600 mt-2">This page is under construction. Check back later!</p>
    </div>
  );
}