import { SignIn } from "@clerk/clerk-react";
import "./signinPage.css";

const SignInPage = () => {
  return (
    <div className="SignInPage">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-out"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
