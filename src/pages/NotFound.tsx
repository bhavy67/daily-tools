import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Try to go back, if no history go to home
          if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate('/');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Icon */}
        <div className="mb-8 relative">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
            🤔
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Looks like you've wandered into the digital wilderness! 🏜️
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mb-4">
            The page <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-red-500">
              {location.pathname}
            </code> doesn't exist.
          </p>
        </div>

        {/* Fun Messages */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm sm:text-base text-blue-800 dark:text-blue-200 mb-2">
                <strong>Did you know?</strong> Even the best developers get lost sometimes!
              </p>
              <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300">
                Maybe you were looking for one of our awesome tools? Check them out from the home page! 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">{countdown}</span>
              </div>
              <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray={`${(countdown / 5) * 125.6} 125.6`}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
            <span className="font-medium">
              Redirecting you back in {countdown} second{countdown !== 1 ? 's' : ''}...
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goBack}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={goHome}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Take Me Home
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 text-6xl opacity-20 dark:opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
          🔍
        </div>
      </div>
    </div>
  );
};
