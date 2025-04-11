import { SignUp } from "@clerk/clerk-react";
import "./signUpPage.css";

const SignOutPage = () => {
  return (
    <div className="signUpPage">
      <SignUp path="/signup" signInUrl="/signin" />
    </div>
  );
};

export default SignOutPage;
