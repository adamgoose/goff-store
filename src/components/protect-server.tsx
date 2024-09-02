import { auth } from "@clerk/nextjs/server";

export type ProtectProps = React.PropsWithChildren<
  (
    | {
      role: string;
      permission?: never;
    }
    | {
      role?: never;
      permission: string;
    }
  ) & {
    fallback?: React.ReactNode;
  }
>;

export default function Protect(props: ProtectProps) {
  const { orgId } = auth();

  if (!orgId) return props.children;

  return <Protect {...props} />;
}
