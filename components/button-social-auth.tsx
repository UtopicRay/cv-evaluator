import React from "react";
import { Button } from "./ui/button";


interface ButtonSocialAuthProps {
  text: string;
  children: React.ReactNode;
}
function ButtonSocialAuth({ text, children }: ButtonSocialAuthProps) {
  return (
    <Button variant="outline" className="w-full bg-transparent">
      {children ? children : <></>}
      {text}
    </Button>
  );
}

export default ButtonSocialAuth;
