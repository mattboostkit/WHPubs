import * as React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SkeletonPubCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-10 w-32 mt-4" />
      </div>
    </div>
  );
}

export function SkeletonEventCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg mb-4">
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </article>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <Skeleton className="h-12 md:h-16 w-64 md:w-96 mx-auto" />
          <Skeleton className="h-6 w-48 md:w-64 mx-auto" />
          <Skeleton className="h-12 w-32 mx-auto mt-6" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonMenuSection() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonGalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  );
}