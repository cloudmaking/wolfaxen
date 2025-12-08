import { Head } from "$fresh/runtime.ts";
import AuthForm from "../islands/AuthForms.tsx";

export default function Signup() {
  return (
    <>
      <Head>
        <title>Sign Up - Wolfaxen</title>
      </Head>
      <div class="min-h-screen bg-oreo-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <AuthForm initialType="signup" />
        </div>
      </div>
    </>
  );
}
