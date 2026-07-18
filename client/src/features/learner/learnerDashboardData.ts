export type DashboardStat = {
  id: string;
  label: string;
  value: number;
  change: string;
  trend: "up" | "neutral";
  tone: "blue" | "red" | "violet" | "green" | "amber" | "cyan";
};

export type RecentActivity = {
  id: number;
  type: "translation" | "booking" | "completed";
  title: string;
  description: string;
  occurredAt: string;
};

// Static dashboard data shaped around the API's bookings, services, files,
// and translation resources. Replace these exports with query results later.
export const DASHBOARD_STATS: DashboardStat[] = [
  { id: "documents", label: "Translation documents", value: 24, change: "+4 this month", trend: "up", tone: "blue" },
  { id: "bookings", label: "Total bookings", value: 18, change: "+3 this month", trend: "up", tone: "violet" },
  { id: "completed", label: "Completed bookings", value: 12, change: "67% completion rate", trend: "neutral", tone: "green" },
  { id: "pending", label: "Pending translations", value: 5, change: "2 due this week", trend: "neutral", tone: "amber" },
  { id: "services", label: "Services used", value: 4, change: "Across 3 languages", trend: "neutral", tone: "cyan" },
  { id: "upcoming", label: "Upcoming sessions", value: 3, change: "Next: Thursday", trend: "neutral", tone: "red" },
];

export const MONTHLY_ACTIVITY = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  translations: [2, 4, 3, 6, 4, 5],
  bookings: [1, 2, 4, 3, 5, 3],
};

export const TRANSLATION_STATUS = {
  labels: ["Completed", "Pending", "Cancelled"],
  values: [17, 5, 2],
};

export const BOOKING_STATUS = {
  labels: ["Completed", "Upcoming", "Cancelled"],
  values: [12, 3, 3],
};

export const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: 1,
    type: "translation",
    title: "Birth certificate uploaded",
    description: "English to Haitian Creole translation",
    occurredAt: "Today, 10:24 AM",
  },
  {
    id: 2,
    type: "booking",
    title: "Conversation session booked",
    description: "Haitian Creole · 60 minute session",
    occurredAt: "Yesterday, 3:15 PM",
  },
  {
    id: 3,
    type: "completed",
    title: "Academic transcript completed",
    description: "Your translated document is ready",
    occurredAt: "Jun 28, 2026",
  },
  {
    id: 4,
    type: "booking",
    title: "Grammar lesson confirmed",
    description: "English · Beginner level",
    occurredAt: "Jun 26, 2026",
  },
];
