import "./signInPage.css";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="signInPage">
      <SignIn
        path="/signin"
        signUpUrl="/signup"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
