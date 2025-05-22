'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CustomDropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

interface DropdownItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  asChild?: boolean
}

export function CustomDropdown({
  trigger,
  children,
  align = 'end',
  className,
}: CustomDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownItem({
  children,
  className,
  onClick,
  asChild,
}: DropdownItemProps) {
  return (
    <DropdownMenuItem className={className} onClick={onClick} asChild={asChild}>
      {children}
    </DropdownMenuItem>
  )
}

export function DropdownSeparator() {
  return <DropdownMenuSeparator />
} 