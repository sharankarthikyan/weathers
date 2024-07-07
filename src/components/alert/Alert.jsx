import { useEffect } from "react";

const Alert = ({ type, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`alert ${type} fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-[90%] text-[1rem]
      md:top-0 md:left-1/2 md:transform md:-translate-x-1/2 md:mt-4 md:w-[90%] md:text-[2rem]
      lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:mt-4 lg:w-[90%] lg:text-[1.4rem]`}
    >
      <div className="flex-1">
        <label
          className="inline-flex items-center space-x-1
        md:inline-flex md:items-center md:space-x-2
        lg:inline-flex lg:items-center lg:space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v5a1 1 0 102 0v-5zm0 7a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>{message}</span>
        </label>
      </div>
    </div>
  );
};

export default Alert;
