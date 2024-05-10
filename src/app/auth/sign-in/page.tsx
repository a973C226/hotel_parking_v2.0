"use client"

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  return (
    <>
		<Navigation></Navigation>
        <SignInForm></SignInForm>
		<Footer></Footer>
    </>
  );
}