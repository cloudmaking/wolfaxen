import { useEffect, useState } from "preact/hooks";

export default function LoginError() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Parse hash for error parameters from Supabase redirect
    // Example: #error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const errorDescription = params.get("error_description");
    const errorCode = params.get("error_code");

    if (errorDescription) {
      setError(errorDescription.replace(/\+/g, " "));
    } else if (errorCode) {
      setError(`Error: ${errorCode}`);
    }
  }, []);

  if (!error) return null;

  return (
    <div class="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded text-sm mb-6">
      <p class="font-bold">Login Failed</p>
      <p>{error}</p>
    </div>
  );
}
