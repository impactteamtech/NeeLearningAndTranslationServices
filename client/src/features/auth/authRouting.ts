import type { UserRole } from "./authTypes";

export const dashboardPathByRole: Record<UserRole, string> = {
  learner: "/dashboard/learner",
  tutor: "/dashboard/tutor",
  admin: "/dashboard/admin",
};
