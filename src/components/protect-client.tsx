import { useAuth } from "@clerk/nextjs";

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
  const { orgId } = useAuth();

  if (!orgId) return props.children;

  return <Protect {...props} />;
}
