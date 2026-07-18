import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip);

type TutorServiceStat = {
  tutorName: string;
  services: number;
};

type TutorAvailabilityStat = {
  id: number;
  tutorName: string;
  totalSlots: number;
  activeSlots: number;
  days: string[];
  startTime: string;
  endTime: string;
};

type RecentActivity = {
  id: number;
  title: string;
  detail: string;
  icon: IconType;
  tone: string;
};

const adminStats = {
  tutors: 8,
  learners: 126,
  services: 24,
  activeAvailabilitySlots: 37,
  bookings: 89,
};

const tutorServiceStats: TutorServiceStat[] = [
  { tutorName: "Marie Jean", services: 6 },
  { tutorName: "Daniel Pierre", services: 4 },
  { tutorName: "Sophia Laurent", services: 5 },
  { tutorName: "Andre Baptiste", services: 3 },
  { tutorName: "Camille Joseph", services: 2 },
  { tutorName: "Nadia Saintil", services: 4 },
];

const tutorAvailabilityStats: TutorAvailabilityStat[] = [
  {
    id: 1,
    tutorName: "Marie Jean",
    totalSlots: 9,
    activeSlots: 8,
    days: ["Monday", "Wednesday", "Friday"],
    startTime: "09:00",
    endTime: "15:00",
  },
  {
    id: 2,
    tutorName: "Daniel Pierre",
    totalSlots: 7,
    activeSlots: 6,
    days: ["Tuesday", "Thursday"],
    startTime: "10:00",
    endTime: "17:00",
  },
  {
    id: 3,
    tutorName: "Sophia Laurent",
    totalSlots: 8,
    activeSlots: 7,
    days: ["Monday", "Tuesday", "Saturday"],
    startTime: "08:30",
    endTime: "14:30",
  },
  {
    id: 4,
    tutorName: "Andre Baptiste",
    totalSlots: 6,
    activeSlots: 5,
    days: ["Wednesday", "Friday"],
    startTime: "12:00",
    endTime: "18:00",
  },
  {
    id: 5,
    tutorName: "Camille Joseph",
    totalSlots: 4,
    activeSlots: 3,
    days: ["Thursday", "Saturday"],
    startTime: "09:30",
    endTime: "13:30",
  },
  {
    id: 6,
    tutorName: "Nadia Saintil",
    totalSlots: 7,
    activeSlots: 6,
    days: ["Monday", "Thursday", "Sunday"],
    startTime: "11:00",
    endTime: "19:00",
  },
];

const recentActivity: RecentActivity[] = [
  {
    id: 1,
    title: "New learner registered",
    detail: "Maya Collins joined the learner portal",
    icon: FiUserPlus,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 2,
    title: "New tutor was added",
    detail: "Nadia Saintil was added to the tutor roster",
    icon: FiUsers,
    tone: "bg-blue-50 text-haiti-navy",
  },
  {
    id: 3,
    title: "Tutor created a service",
    detail: "Marie Jean published Haitian Creole Conversation",
    icon: FiBookOpen,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    id: 4,
    title: "Availability slot created",
    detail: "Daniel Pierre opened Tuesday 10:00 AM to 12:00 PM",
    icon: FiClock,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    id: 5,
    title: "Learner submitted a booking",
    detail: "Booking request submitted for Translation Support",
    icon: FiCalendar,
    tone: "bg-red-50 text-haiti-red",
  },
];

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

const formatTime = (time: string) => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      cornerRadius: 10,
      padding: 12,
    },
  },
  scales: {
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: { color: "#64748b", font: { size: 11, weight: 600 } },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 8,
      border: { display: false },
      grid: { color: "rgba(226, 232, 240, 0.75)" },
      ticks: { precision: 0, color: "#94a3b8", font: { size: 11 } },
    },
  },
};

const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "72%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxHeight: 7,
        boxWidth: 7,
        color: "#64748b",
        font: { size: 11, weight: 600 },
      },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      cornerRadius: 10,
      padding: 10,
    },
  },
};

type StatCardProps = {
  label: string;
  value: number;
  detail: string;
  icon: IconType;
  tone: "blue" | "red" | "green" | "amber" | "violet";
};

const toneClasses: Record<StatCardProps["tone"], string> = {
  blue: "bg-blue-50 text-haiti-navy",
  red: "bg-red-50 text-haiti-red",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
};

const StatCard = ({ label, value, detail, icon: Icon, tone }: StatCardProps) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold leading-5 text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          {formatNumber(value)}
        </p>
      </div>
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${toneClasses[tone]}`}>
        <Icon className="size-[1.15rem]" aria-hidden="true" />
      </span>
    </div>
    <p className="mt-3 text-[0.7rem] font-semibold text-slate-400">{detail}</p>
  </article>
);

const ChartCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] sm:p-6">
    <h2 className="text-base font-bold text-slate-900">{title}</h2>
    <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
    {children}
  </article>
);

const AvailabilityTable = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
    <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
      <h2 className="text-base font-bold text-slate-900">Tutor availability overview</h2>
      <p className="mt-1 text-xs text-slate-400">
        Static schedule summary for the admin dashboard prototype
      </p>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-[48rem] w-full text-left">
        <thead className="bg-slate-50 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-400">
          <tr>
            <th className="px-5 py-3 sm:px-6">Tutor</th>
            <th className="px-5 py-3">Slots</th>
            <th className="px-5 py-3">Active</th>
            <th className="px-5 py-3">Days</th>
            <th className="px-5 py-3">Time range</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tutorAvailabilityStats.map((tutor) => (
            <tr key={tutor.id} className="text-sm transition hover:bg-slate-50/70">
              <td className="px-5 py-4 sm:px-6">
                <p className="font-extrabold text-slate-900">{tutor.tutorName}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {tutorServiceStats.find((item) => item.tutorName === tutor.tutorName)?.services ?? 0} assigned services
                </p>
              </td>
              <td className="px-5 py-4 font-bold text-slate-700">{tutor.totalSlots}</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {tutor.activeSlots} active
                </span>
              </td>
              <td className="px-5 py-4 text-slate-600">{tutor.days.join(", ")}</td>
              <td className="px-5 py-4 font-semibold text-slate-600">
                {formatTime(tutor.startTime)} - {formatTime(tutor.endTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AdminDashboardHome = () => {
  const servicesChartData = {
    labels: tutorServiceStats.map((item) => item.tutorName),
    datasets: [
      {
        label: "Assigned services",
        data: tutorServiceStats.map((item) => item.services),
        backgroundColor: "#06439f",
        borderRadius: 8,
        maxBarThickness: 38,
      },
    ],
  };

  const distributionData = {
    labels: ["Learners", "Tutors"],
    datasets: [
      {
        data: [adminStats.learners, adminStats.tutors],
        backgroundColor: ["#06439f", "#CE1126"],
        borderWidth: 0,
        hoverOffset: 3,
      },
    ],
  };

  return (
    <section className="animate-fade-in">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-haiti-red">
            Admin overview
          </p>
          <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Platform dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Static preview of tutors, learners, services, availability, and booking activity.
          </p>
        </div>
        <div className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-haiti-navy px-4 text-xs font-bold text-white">
          <FiCheckCircle className="size-4" />
          Static dashboard data
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total tutors"
          value={adminStats.tutors}
          detail="+2 tutors added this month"
          icon={FiUsers}
          tone="blue"
        />
        <StatCard
          label="Total learners"
          value={adminStats.learners}
          detail="+18 learner signups this month"
          icon={FiUserPlus}
          tone="green"
        />
        <StatCard
          label="Total services"
          value={adminStats.services}
          detail="21 active learning services"
          icon={FiLayers}
          tone="violet"
        />
        <StatCard
          label="Active availability"
          value={adminStats.activeAvailabilitySlots}
          detail="Across 6 tutor schedules"
          icon={FiClock}
          tone="amber"
        />
        <StatCard
          label="Total bookings"
          value={adminStats.bookings}
          detail="14 pending booking requests"
          icon={FiCalendar}
          tone="red"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <ChartCard
          title="Services by tutor"
          description="Mock comparison of how many services are assigned to each tutor"
        >
          <div className="mt-5 h-72 sm:h-80">
            <Bar data={servicesChartData} options={barOptions} />
          </div>
        </ChartCard>

        <ChartCard
          title="User distribution"
          description="Static split of learners and tutors across the platform"
        >
          <div className="relative mt-4 h-72">
            <Doughnut data={distributionData} options={doughnutOptions} />
          </div>
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <AvailabilityTable />

        <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Recent activity</h2>
          <p className="mt-1 text-xs text-slate-400">
            Static events for the current dashboard prototype
          </p>
          <ul className="mt-5 divide-y divide-slate-100">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.tone}`}>
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-800">{item.title}</span>
                    <span className="mt-0.5 block truncate text-xs leading-5 text-slate-500">{item.detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
};
