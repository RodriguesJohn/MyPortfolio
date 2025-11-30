"use client"

import * as React from "react"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface MenuBarItem {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  label: string
  onClick?: () => void
  href?: string
  value?: string
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuBarItem[]
  activeTab?: string
}

const hoverTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25
}


export function MenuBar({ items, activeTab, className, ...props }: MenuBarProps) {
  const [isDark, setIsDark] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn("relative", className)} {...props}>
      <div 
        ref={menuRef}
        className={cn(
          "h-14 px-2 inline-flex justify-center items-center gap-1 overflow-x-auto z-10",
          "rounded-full",
          "bg-background/70 dark:bg-background/60",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/20 dark:border-white/10",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.2)]",
          "dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => {
          const isActive = activeTab && item.value === activeTab;
          
          if (item.href) {
            return (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "h-10 px-3 py-1 rounded-full flex items-center justify-center gap-2 whitespace-nowrap",
                  isActive && "bg-white/10"
                )}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                  transition: hoverTransition
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ scale: 1 }}
              >
                <div className={cn(
                  "w-[18px] h-[18px] flex justify-center items-center overflow-hidden flex-shrink-0",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  <item.icon className="w-full h-full" />
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  {item.label}
                </span>
              </motion.a>
            );
          }
          
          return (
            <motion.button 
              key={index}
              onClick={item.onClick}
              className={cn(
                "h-10 px-3 py-1 rounded-full flex items-center justify-center gap-2 whitespace-nowrap",
                isActive && "bg-white/10"
              )}
              whileHover={{
                scale: 1.05,
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                transition: hoverTransition
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ scale: 1 }}
            >
              <div className={cn(
                "w-[18px] h-[18px] flex justify-center items-center overflow-hidden flex-shrink-0",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                <item.icon className="w-full h-full" />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  )
}

