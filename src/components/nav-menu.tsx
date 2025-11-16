"use client";

import * as React from "react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export type NavMenuItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

type NavMenuProps = {
  items: NavMenuItem[];
};

export function NavMenu({ items }: NavMenuProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScroll = React.useRef(0);

  React.useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll < lastScroll.current);
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <motion.div
      initial={isMobile ? { y: 100 } : undefined}
      animate={isMobile ? { y: isVisible ? 0 : 100 } : undefined}
      transition={
        isMobile ? { type: "spring", stiffness: 300, damping: 30 } : undefined
      }
      className="max-sm:fixed max-sm:z-10 max-sm:justify-center max-sm:flex-1 max-sm:bottom-0 max-sm:inset-x-0 max-sm:py-2"
    >
      <NavigationMenu
        viewport={false}
        className="max-sm:backdrop-blur-sm max-sm:p-2 max-sm:border max-sm:rounded-xl w-full mx-auto"
        aria-label="Menu de navegação principal"
      >
        <NavigationMenuList className="gap-2">
          {items.map((item) => {
            // const isActive = pathname.startsWith(item.url);
            const isActive = pathname === item.url

            return (
              <NavigationMenuItem key={item.url}>
                <NavigationMenuLink
                  asChild
                  data-active={isActive}
                  className={cn(
                    "md:flex-row md:gap-2 items-center text-muted-foreground font-medium data-[active]:bg-transparent!",
                    isActive && "data-[active]:text-primary"
                  )}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-1"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon && (
                      <item.icon
                        className="w-5 h-5 data-[active]:text-primary"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
}
