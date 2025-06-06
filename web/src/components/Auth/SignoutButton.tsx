import { navigate, routes } from "@redwoodjs/router";

import { useAuth } from "src/auth";

const SignoutButton = () => {
  const { logOut, loading } = useAuth()
  const onClick = async () => {
    await logOut()
    navigate(routes.home())
  }
  return (
    <button
      className="primary me-2"
      onClick={() => onClick()}
      disabled={loading}
    >
      Abmelden
    </button>
  )
}

export default SignoutButton
