'use client';

import { cn } from "@/lib/utils";
import React from "react";

interface TabsProps<T extends string = string> {
  defaultValue: T;
  value?: T;
  onValueChange?: (value: T) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps<T extends string = string> {
  value: T;
  currentValue?: T;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TabsContentProps<T extends string = string> {
  value: T;
  currentValue?: T;
  children: React.ReactNode;
  className?: string;
}

export function Tabs<T extends string = string>({ defaultValue, value, children, className }: TabsProps<T>) {
  const currentValue = value ?? defaultValue;
  
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentValue } as TabsTriggerProps<T> | TabsContentProps<T>);
    }
    return child;
  });

  return (
    <div className={cn("space-y-4", className)}>
      {childrenWithProps}
    </div>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn(
      "inline-flex items-center justify-center rounded-lg bg-muted p-1",
      className
    )}>
      {children}
    </div>
  );
}

export function TabsTrigger<T extends string = string>({ value, currentValue, children, className, onClick }: TabsTriggerProps<T>) {
  const isActive = currentValue === value;

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-all rounded-md",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive ? [
          "bg-background text-foreground",
          "shadow-sm",
        ] : [
          "text-muted-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ],
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent<T extends string = string>({ value, currentValue, children, className }: TabsContentProps<T>) {
  if (value !== currentValue) return null;

  return (
    <div className={cn("mt-2", className)}>
      {children}
    </div>
  );
} 