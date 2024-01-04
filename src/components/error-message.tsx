interface ErrorProps {
  error?: string;
}

function ErrorMessage({ error }: ErrorProps) {
  return error && <div className="text-red-400">{error}</div>;
}

export default ErrorMessage;
