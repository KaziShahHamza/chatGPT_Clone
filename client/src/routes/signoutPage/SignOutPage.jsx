import { SignUp } from "@clerk/clerk-react";
import "./signoutPage.css";

const SignOutPage = () => {
  return (
    <div className="SignOutPage">
      <SignUp path="/sign-out" signInUrl="/sign-in"/>
    </div>
  );
};

export default SignOutPage;
