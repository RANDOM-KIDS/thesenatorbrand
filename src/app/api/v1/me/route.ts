import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";
import { requireUser } from "@/lib/guards";
import { apiError } from "@/lib/api-error";

const patchSchema = z.object({
  fullName: z.string().trim().min(1).max(100).optional(),
  phone: z.string().trim().min(7).max(20).optional(),
}); // unknown keys such as role or email are dropped, never applied

type MeSource = {
  id: string;
  email: string;
  fullName?: string | null;
  name?: string | null;
  phone?: string | null;
  role?: string | null;
  createdAt: Date | string;
};

const toMe = (u: MeSource) => ({
  id: u.id,
  email: u.email,
  fullName: u.fullName ?? u.name ?? null,
  phone: u.phone ?? null,
  role: u.role ?? "customer",
  createdAt: u.createdAt,
});

export async function GET(req: Request) {
  const s = await requireUser(req);
  if (s instanceof Response) return s;
  return Response.json(toMe(s.user));
}

export async function PATCH(req: Request) {
  const s = await requireUser(req);
  if (s instanceof Response) return s;

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success)
    return apiError(
      400,
      "VALIDATION_ERROR",
      "Some fields are invalid",
      z.flattenError(parsed.error).fieldErrors,
    );

  if (Object.keys(parsed.data).length === 0) return Response.json(toMe(s.user));

  const [updated] = await db
    .update(user)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(user.id, s.user.id))
    .returning();
  return Response.json(toMe(updated));
}
