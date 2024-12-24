const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-95 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* White spinner */}
        <div className="relative">
          <div className="h-20 w-20 border-[6px] border-transparent border-t-white border-b-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        {/* Animated loading text */}
        <p className="text-lg font-semibold text-white tracking-wide animate-pulse">
          Preparing your pass...
        </p>
        {/* Branding with infinity animation */}
        <div className="flex flex-col items-center space-y-2">
          {/* Infinity Symbol Animation */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute w-full h-full bg-white rounded-full animate-spin-slow opacity-20"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="h-12 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75c-.664-.664-1.75-.664-2.414 0L4.5 12l2.836 2.25c.664.664 1.75.664 2.414 0m4.5-4.5c.664-.664 1.75-.664 2.414 0L19.5 12l-2.836 2.25c-.664.664-1.75.664-2.414 0m-4.5-4.5l4.5 4.5"
              />
            </svg>
          </div>
          {/* Text with Branding */}
          <p className="text-sm text-white">
            <span className="font-bold">Designed</span> by{" "}
            <a
              href="https://infyne.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              infyne.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
