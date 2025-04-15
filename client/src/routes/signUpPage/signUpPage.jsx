import "./signUpPage.css";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="signUpPage">
      <SignUp path="/signup" signInUrl="/signin" />
    </div>
  );
};

export default SignUpPage;
