import React from "react";

export default function UserSkeleton() {
  return (
    <div className="flex items-center bg-ob-blue-2 gap-x-2.5 px-2.5 py-1.5 rounded-xl">
      <div className="w-6 h-6 rounded-full bg-ob-lightblue/30 animate-pulse" />
      <div className="w-20 h-4 rounded-md bg-ob-lightblue/30 animate-pulse" />
      <div className="w-4 h-4 rounded-md bg-ob-lightblue/30 animate-pulse" />
    </div>
  );
}
