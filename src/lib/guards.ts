import { auth } from "@/lib/auth";
import { apiError } from "@/lib/api-error";

export type AuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export async function requireUser(
  req: Request,
): Promise<AuthSession | Response> {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return apiError(401, "UNAUTHENTICATED", "You need to sign in");
  return session;
}

export async function requireAdmin(
  req: Request,
): Promise<AuthSession | Response> {
  const result = await requireUser(req);
  if (result instanceof Response) return result;
  if (result.user.role !== "admin")
    return apiError(403, "FORBIDDEN", "You don't have access to this");
  return result;
}
