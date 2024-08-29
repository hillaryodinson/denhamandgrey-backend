import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({
  page,
  perPage,
  start,
  end,
  length,
}: {
  page: string | number;
  perPage: string | number;
  start: string | number;
  end: string | number;
  length: number;
}) => {
  const router = useRouter();

  console.log(
    "End: " + Number(end),
    "PerPage: " + Number(perPage),
    "CurrentItems: " + (Number(end) + Number(perPage)),
    "Length: " + length,
  );

  const handlePrev = () => {
    router.push(`/?page=${Number(page) - 1}&per_page=${perPage}`);
  };

  const handleNext = () => {
    router.push(`/?page=${Number(page) + 1}&per_page=${perPage}`);
  };

  return (
    <div className="mt-5 flex items-center justify-center">
      {Number(page) - 1 > 0 && (
        <Button className={cn("mx-1")} onClick={handlePrev}>
          Prev
        </Button>
      )}

      {Number(end) + Number(perPage) <= length && length > 0 && (
        <Button className={cn("mx-1")} onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
