"use client";
import cx from "@/libs/cx";
import { div, span } from "motion/react-client";
import React, { useState } from "react";

interface ToggleProps {
  items: string[];
  className?: {
    main?: string;
    item?: string;
    background?: string;
    text?: string;
  };
}

export default function Toggle({ items, className }: ToggleProps) {
  const [currentIndex, setIndex] = useState(0);

  return (
    <div
      className={cx(
        " flex items-center gap-x-2 p-1.5 rounded-xl w-fit",
        className?.main
      )}
    >
      {items.map((item, index) => {
        return (
          <div
            className={cx(
              " px-3 py-2 rounded-md cursor-pointer relative",
              className?.item
            )}
            onClick={() => setIndex(index)}
          >
            {currentIndex === index && (
              <span
                className={cx(
                  "bg-ob-black-4 absolute w-full h-full top-0 left-0 rounded-md",
                  className?.background
                )}
              />
            )}

            <span className={cx("relative z-10", className?.text)}>{item}</span>
          </div>
        );
      })}
    </div>
  );
}
