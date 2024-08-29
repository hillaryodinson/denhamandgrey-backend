/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
/* eslint-disable @next/next/no-img-element */
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideColumns2 } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "../layout/section-wrapper";

const skills = [
  {
    name: "Next JS",
    image: "/icons/next.js.png",
  },
  {
    name: "React JS",
    image: "/icons/React.png",
  },
  {
    name: "HTML",
    image: "/icons/HTML5.png",
  },
  {
    name: "CSS3",
    image: "/icons/CSS3.png",
  },
  {
    name: "Tailwind CSS",
    image: "/icons/Tailwind CSS.png",
  },
  {
    name: "JavaScript",
    image: "/icons/JavaScript.png",
  },
  {
    name: "TypeScript",
    image: "/icons/TypeScript.png",
  },
  {
    name: "NodeJS",
    image: "/icons/Node.js.png",
  },
  {
    name: "Express",
    image: "/icons/Express.png",
  },
  {
    name: "PHP",
    image: "/icons/PHP.png",
  },
  {
    name: "Laravel",
    image: "/icons/Laravel.png",
  },
  {
    name: "Livewire",
    image: "/icons/Livewire.png",
  },
  {
    name: "MongoDB",
    image: "/icons/MongoDB.png",
  },
  {
    name: "MySQL",
    image: "/icons/MySQL.png",
  },
  {
    name: "PostgresSQL",
    image: "/icons/PostgresSQL.png",
  },
  {
    name: "SQLite",
    image: "/icons/SQLite.png",
  },
  {
    name: "Docker",
    image: "/icons/Docker.png",
  },
  {
    name: "GitHub",
    image: "/icons/GitHub.png",
  },
  {
    name: "Redis",
    image: "/icons/Redis.png",
  },
  {
    name: "Redux",
    image: "/icons/Redux.png",
  },
];

interface Skill {
  name: string;
  image: string;
}

function splitArray<T>(array: Array<T>, numParts: number): Array<Array<T>> {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < numParts; i++) {
    result.push([]);
  }

  array.forEach((item, index) => {
    result[index % numParts].push(item);
  });

  return result;
}

function SkillColumn({
  skills,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  skills: Skill[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {skills.concat(skills).map(({ image, name }, reviewIndex) => (
        <Skill
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % skills.length)}
          name={name}
          image={image}
        />
      ))}
    </div>
  );
}

interface SkillProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  image: string;
}

function Skill({ name, image, className, ...props }: SkillProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "shadow0slate900/5 animate-fade-in bg-white opacity-0",
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <div className="skill-card" key={name}>
        <div>
          <Image src={image} width={48} height={48} alt={`${name} icon`} />
        </div>
        <p className="flex min-h-8 items-center justify-center break-words text-xs font-medium">
          {name}
        </p>
      </div>
    </div>
  );
}

function SkillGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(skills, 4);

  return (
    <div
      ref={containerRef}
      className="relative grid max-h-[408px] grid-cols-3 gap-4 overflow-hidden md:grid-cols-4"
    >
      {isInView ? (
        <>
          <SkillColumn skills={columns[0] ?? []} msPerPixel={10} />
          <SkillColumn skills={columns[1] ?? []} msPerPixel={15} />
          <SkillColumn skills={columns[2] ?? []} msPerPixel={20} />
          <SkillColumn
            skills={columns[3] ?? []}
            className="hidden md:block"
            msPerPixel={25}
          />
          <div className="pointer-event-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-50" />
          <div className="pointer-event-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-50" />
        </>
      ) : null}
    </div>
  );
}

export default function Skills() {
  return <SkillGrid />;
}
