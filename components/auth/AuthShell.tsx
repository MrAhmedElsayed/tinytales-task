import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  Sparkles,
  Truck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: ReactNode;
  panelTitle: string;
  panelDescription: string;
  className?: string;
  logoSize?: "default" | "large";
};

type HighlightItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const highlightItems: HighlightItem[] = [
  {
    icon: ShieldCheck,
    title: "Secure Sign-In",
    description: "Protected sessions for parents and caregivers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick shipping for your little one's essentials.",
  },
  {
    icon: UserRoundCheck,
    title: "Trusted Community",
    description: "Thousands of families already shop with Tinytales.",
  },
];

export function AuthShell({
  children,
  panelTitle,
  panelDescription,
  className,
  logoSize = "default",
}: AuthShellProps) {
  return (
    <main className="relative flex h-[100dvh] overflow-hidden bg-background p-2 sm:p-3 lg:p-4">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(179,139,109,0.22),transparent_40%),radial-gradient(circle_at_95%_10%,rgba(51,51,51,0.08),transparent_30%)]" />
      <Card className="mx-auto h-full w-full max-w-6xl overflow-hidden border-[#e8e2db] bg-white p-0 shadow-[0_25px_65px_rgba(8,8,8,0.08)]">
        <CardContent className="grid h-full p-0 lg:grid-cols-[1.04fr_0.96fr]">
          <section className={cn("flex h-full flex-col p-4 sm:p-6 lg:p-8", className)}>
            <Link href="/" className="mb-5 mt-1 inline-flex w-full justify-center sm:mb-6 lg:mb-7">
              <Image
                src="/svg/TT LogoTT Logo 1.svg"
                alt="Tinytales logo"
                width={logoSize === "large" ? 112 : 92}
                height={logoSize === "large" ? 84 : 70}
                className={cn(
                  "w-auto",
                  logoSize === "large" ? "h-16 sm:h-[4.75rem]" : "h-12 sm:h-14"
                )}
                priority
              />
            </Link>
            {children}
          </section>

          <aside className="relative hidden h-full overflow-hidden bg-[#f1eeea] p-6 lg:flex lg:flex-col lg:justify-between lg:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(179,139,109,0.32),rgba(255,255,255,0.4)_55%,rgba(255,255,255,0.92))]" />
            <div className="pointer-events-none absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#be968e]/35 blur-2xl" />
            <div className="pointer-events-none absolute bottom-20 right-4 h-52 w-52 rounded-full bg-[#b38b6d]/20 blur-3xl" />

            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#d8c5b7] bg-white/75 px-3 py-1 text-[11px] font-medium tracking-[0.17em] text-[#6c4f3f] uppercase">
                <Sparkles className="size-3.5" />
                Organic Parenting Store
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-[#111]">
                {panelTitle}
              </h2>
              <p className="mt-2.5 max-w-[32ch] text-sm leading-6 text-[#5b5b5b]">
                {panelDescription}
              </p>
            </div>

            <div className="relative z-10 space-y-2.5">
              {highlightItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/80 bg-white/70 p-3.5 backdrop-blur"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex rounded-xl bg-[#f4ede7] p-2 text-[#6c4f3f]">
                      <item.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1d1d1d]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#5b5b5b]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </CardContent>
      </Card>
    </main>
  );
}
