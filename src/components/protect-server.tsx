import { auth } from "@clerk/nextjs/server";
import { Protect } from "@clerk/nextjs";

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

export default function ProtectServer(props: ProtectProps) {
  const { orgId } = auth();

  if (!orgId) return props.children;

  return <Protect {...props} />;
}
