"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-auto rounded-md p-1",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center w-full justify-center whitespace-nowrap rounded-lg p-3 text-sm font-medium font-inter ring-offset-white transition-all disabled:pointer-events-none disabled:opacity-50",
      "bg-transparent border transition-colors",
      "[color:rgba(255,255,255,0.4)] [border-color:rgba(255,255,255,0.08)]",
      "data-[state=active]:bg-white data-[state=active]:text-[#0a0a0a] data-[state=active]:border-white data-[state=active]:font-semibold",
      "hover:[color:rgba(255,255,255,0.8)] hover:[border-color:rgba(255,255,255,0.2)]",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "min-h-[480px] ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
