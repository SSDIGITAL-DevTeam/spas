import { JSX, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props): JSX.Element {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
