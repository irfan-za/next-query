"use client";
import React from "react";

export default function LoadingCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="bg-gray-300 h-6 w-20 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-16 rounded"></div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-3"></div>
        <div className="space-y-2">
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
          <div className="bg-gray-200 h-4 w-4/6 rounded"></div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="bg-gray-300 h-4 w-16 rounded"></div>
          </div>
          <div className="bg-gray-300 h-4 w-20 rounded"></div>
        </div>
      </div>
    </div>
  );
}
