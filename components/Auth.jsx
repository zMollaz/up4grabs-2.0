import { useSession, signIn, signOut } from "next-auth/react";

const Auth = () => {
  const { data: session } = useSession();
  
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  if (session) {
    if (session.user.name !== null) {
      return (
        <div className="flex items-center mt-2 font-lucky text-lg">
          <strong className="pt-2 text-xl"> {session.user.name} </strong> <br />
          <svg
            className="xs:h-7 xs:w-7 text-white ml-2 hover:text-red"
            onClick={signOut}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
        </div>
      );
    } else {
      reloadSession();
    }
  }
  return (
    <button className="mt-2 font-lucky font-bold text-xl" onClick={signIn}>
      Sign in
    </button>
  );
};

export default Auth;
//