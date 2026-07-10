import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 10000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colorClass = type === 'success' ? 'bg-purple-600/50' : 'bg-red-600/50';

  return (
    <div
      className={`fixed top-1/2 left-4 -translate-y-1/2 z-50 w-4/5 h-4/5 max-h-[80vh] overflow-y-auto ${colorClass} text-white text-sm px-3 py-2 rounded shadow-lg`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="min-w-0 flex-1 break-words">{message}</span>
        <button onClick={onClose} className="flex-shrink-0 font-bold leading-none">&times;</button>
      </div>
    </div>
  );
};

export default Toast;
