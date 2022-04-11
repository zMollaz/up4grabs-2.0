import { getCsrfToken, signIn } from "next-auth/react";
import {useState} from "react";

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const csrfToken = await getCsrfToken(context)
//   console.log(444, context)
//   return {
//     props: { csrfToken },
//   }
// }

export default function SignIn() {
  const [email, setEmail] = useState('')

  return (
    <form method="post" action="/api/auth/signin/email" onSubmit={signIn('email', { email: text })}>
      {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
      <label>
        Email address
        <input type="email" id="email" name="email" value={text} onChange={e => setText(e.target.value)} />
      </label>
      <button type="submit" >Sign in with Email</button>
    </form>
  );
}
