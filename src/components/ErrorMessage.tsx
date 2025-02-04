import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
        <p className="text-red-700 font-medium">{message}</p>
      </div>
    </div>
  );
}