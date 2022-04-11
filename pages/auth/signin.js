import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const csrfToken = await getCsrfToken(context)
//   console.log(444, context)
//   return {
//     props: { csrfToken },
//   }
// }

export default function SignIn() {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // Notice, we are also redirecting users to the protected route instead of the homepage after signing in.
    // signIn("email", { email });
    signIn("email", { callbackUrl: "/", email });
  };

  return (
    <form
      method="post"
      action="/api/auth/signin/email"
      onSubmit={submitHandler}
    >
      <label>
        Email address
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  );
}
