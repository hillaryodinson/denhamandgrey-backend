"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";

interface PortfolioProp {
  image: string;
  title: string;
  tags: string;
}

function PortfolioGrid({ portfolios }: { portfolios: PortfolioProp[] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
      {portfolios.map((portfolio, index) => (
        <PortfolioGridItem
          key={index}
          image={portfolio.image}
          title={portfolio.title}
          tags={portfolio.tags}
        />
      ))}
    </div>
  );
}

function PortfolioGridItem({ image, title, tags }: PortfolioProp) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-muted">
      <img
        src={image}
        alt="Image 2"
        width={600}
        height={400}
        className="h-[300px] w-full object-cover transition-all duration-300 group-hover:scale-105"
        style={{ aspectRatio: "600/400", objectFit: "cover" }}
      />
      <div className="absolute inset-0 left-0 top-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/80">{tags}</p>
      </div>
    </div>
  );
}
export default PortfolioGrid;
