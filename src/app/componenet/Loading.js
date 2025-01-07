"use client"
import { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import spinner from './icons8-spinning-circle.gif'
import Image from "next/image";

export const LoadingAnimation = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setLoading(false);
      setSuccess(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md opacity-0 scale-95 animate-fadeIn"
        role="alert"
        aria-live="polite"
      >
        <div className="flex flex-col items-center space-y-6">
          {loading ? (
            <>
              <Image
                src={spinner}
                alt="Loading..."
                width={75}
                height={75}
              />
              <h2 className="text-2xl font-semibold text-gray-800">
                Signing you in...
              </h2>
              <p className="text-gray-600 text-center">
                Please wait while we verify your credentials
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 animate-progress"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4 animate-scaleIn">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Successfully signed in!
              </h2>
              <p className="text-gray-600 text-center">
                You will be redirected to your dashboard
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-progress {
          animation: progress 3s linear forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};


export const LoadingSpinner = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50"
      role="alert"
      aria-busy="true"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <FaSpinner
          className="animate-spin text-blue-600 w-16 h-16"
          aria-label="Loading"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 font-medium text-sm animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};
