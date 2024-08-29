import React from "react";
import SectionWrapper from "../section-wrapper";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <SectionWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            Hillary <span className="text-green-600"> Sylvester</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            <Link
              href="/portfolio"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              About me
            </Link>

            <div className="hidden h-8 w-px bg-zinc-200 sm:block" />
            <Link
              href="/contact"
              className={buttonVariants({
                size: "sm",
                className: "hidden items-center gap-1 sm:flex",
              })}
            >
              Get in Touch
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </nav>
  );
}

export default Navbar;
