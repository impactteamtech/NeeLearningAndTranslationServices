import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiCalendar,
  FiAlertCircle,
  FiClock,
  FiDownload,
  FiEye,
  FiEyeOff,
  FiExternalLink,
  FiFileText,
  FiKey,
  FiLayers,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { useCurrentUser } from "../../features/auth/authQueries";
import {
  useAdminService,
  useAdminServices,
  useAdminTeacherServices,
} from "../../features/services/services.queries";
import {
  useAdminAvailability,
  useAdminAvailabilitySlot,
  useAdminTeacherAvailability,
} from "../../features/availability/availability.queries";
import {
  useAdminBooking,
  useAdminBookings,
  useAdminStudentBookings,
  useAdminTeacherBookings,
} from "../../features/bookings/bookings.queries";
import {
  useAdminTranslationRequestFileLists,
  useAdminTranslationRequests,
  useDeleteAdminFile,
} from "../../features/files/files.queries";
import { ApiError } from "../../lib/apiClient";
import type {
  AdminAvailability as AdminAvailabilityRecord,
  AdminBooking,
  AdminFile,
  AdminService,
  AdminTranslationRequest,
  CountDatum,
} from "../../types/adminApi";
import {
  DataTable,
  DetailsDrawer,
  EmptyState,
  ErrorState,
  FilterBar,
  LoadingSkeleton,
  PageHeader,
  Pagination,
  PermissionDenied,
  SearchInput,
  SelectFilter,
  StatCard,
  StatusBadge,
  type DataTableColumn,
} from "../../components/ui/adminUi";
import { formatValue, getErrorMessage } from "../../components/ui/adminFormat";

const chartColors = ["#06439f", "#CE1126", "#0f766e", "#7c3aed", "#ca8a04", "#475569"];
const pageSize = 8;

const has = <T,>(items: T[], pick: (item: T) => unknown) =>
  items.some((item) => pick(item) !== undefined && pick(item) !== null && pick(item) !== "");

const uniqueOptions = <T,>(items: T[], pick: (item: T) => unknown) =>
  Array.from(
    new Set(
      items
        .map((item) => pick(item))
        .filter((value): value is string | number => value !== undefined && value !== null && value !== "")
        .map(String)
    )
  ).sort((a, b) => a.localeCompare(b));

const countBy = <T,>(items: T[], pick: (item: T) => unknown): CountDatum[] => {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const raw = pick(item);
    if (raw === undefined || raw === null || raw === "") return;
    const key = String(raw);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return Array.from(counts, ([name, value]) => ({ name, value })).sort(
    (a, b) => b.value - a.value
  );
};

const byDateDesc = <T extends { createdAt?: string; bookingDate?: string }>(items: T[]) =>
  [...items].sort((a, b) => {
    const left = Date.parse(a.createdAt ?? a.bookingDate ?? "");
    const right = Date.parse(b.createdAt ?? b.bookingDate ?? "");
    return (Number.isFinite(right) ? right : 0) - (Number.isFinite(left) ? left : 0);
  });

const formatDateTime = (value?: string) => {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const formatBytes = (bytes?: number) => {
  if (!Number.isFinite(bytes) || !bytes) return "Unknown size";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const isPendingStatus = (status?: string) =>
  !status || status.toLowerCase().includes("pending") || status.toLowerCase().includes("new");

const usePagedItems = <T,>(items: T[]) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const paged = items.slice((safePage - 1) * pageSize, safePage * pageSize);
  return { paged, page: safePage, pageCount, setPage };
};

const RawDetails = ({ record }: { record: Record<string, unknown> }) => (
  <dl className="grid gap-3">
    {Object.entries(record).map(([key, value]) => (
      <div key={key} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
        <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-400">
          {key}
        </dt>
        <dd className="mt-1 break-words text-sm font-semibold text-slate-800">
          {typeof value === "object" && value !== null
            ? JSON.stringify(value)
            : formatValue(value)}
        </dd>
      </div>
    ))}
  </dl>
);

const PartialError = ({
  label,
  error,
  onRetry,
}: {
  label: string;
  error: unknown;
  onRetry: () => void;
}) => {
  if (error instanceof ApiError && error.status === 403) {
    return <PermissionDenied message={`${label}: ${error.message}`} />;
  }

  return (
    <ErrorState
      title={`${label} unavailable`}
      message={getErrorMessage(error)}
      onRetry={onRetry}
    />
  );
};

const DistributionChart = ({
  title,
  data,
  type = "pie",
}: {
  title: string;
  data: CountDatum[];
  type?: "pie" | "bar";
}) => {
  if (data.length < 2) return null;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-extrabold text-slate-950">{title}</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === "pie" ? (
            <PieChart>
              <Tooltip />
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={95}>
                {data.map((item, index) => (
                  <Cell key={item.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#06439f" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export const AdminOverview = () => {
  const services = useAdminServices();
  const availability = useAdminAvailability();
  const bookings = useAdminBookings();

  const serviceData = services.data ?? [];
  const availabilityData = availability.data ?? [];
  const bookingData = bookings.data ?? [];
  const serviceCategories = countBy(serviceData, (item) => item.category);
  const serviceLanguages = countBy(serviceData, (item) => item.language);
  const bookingStatuses = countBy(bookingData, (item) => item.status);
  const recentServices = byDateDesc(serviceData).slice(0, 5);
  const recentBookings = byDateDesc(bookingData).slice(0, 5);
  const activeServices = serviceData.filter((item) => item.isActive === true).length;

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin overview"
        title="Platform activity"
        description="Operational summary calculated only from the documented services, availability, and bookings endpoints."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total services" value={serviceData.length} icon={FiLayers} />
        {has(serviceData, (item) => item.isActive) ? (
          <StatCard label="Active services" value={activeServices} icon={FiLayers} />
        ) : null}
        <StatCard
          label="Availability records"
          value={availabilityData.length}
          icon={FiClock}
        />
        <StatCard label="Total bookings" value={bookingData.length} icon={FiCalendar} />
      </div>

      <div className="grid gap-3">
        {services.isLoading || availability.isLoading || bookings.isLoading ? (
          <LoadingSkeleton rows={2} />
        ) : null}
        {services.isError ? (
          <PartialError label="Services" error={services.error} onRetry={() => services.refetch()} />
        ) : null}
        {availability.isError ? (
          <PartialError
            label="Availability"
            error={availability.error}
            onRetry={() => availability.refetch()}
          />
        ) : null}
        {bookings.isError ? (
          <PartialError label="Bookings" error={bookings.error} onRetry={() => bookings.refetch()} />
        ) : null}
      </div>

      {bookingStatuses.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {bookingStatuses.map((item) => (
            <StatCard
              key={item.name}
              label={`${item.name} bookings`}
              value={item.value}
              icon={FiCalendar}
            />
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <DistributionChart title="Service categories" data={serviceCategories} type="bar" />
        <DistributionChart title="Service languages" data={serviceLanguages} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <article>
          <h2 className="mb-3 text-base font-extrabold text-slate-950">Recent services</h2>
          <DataTable
            items={recentServices}
            getKey={(item) => item.id}
            empty={<EmptyState title="No services found" description="The services endpoint returned no records." />}
            columns={[
              {
                key: "name",
                header: "Name",
                render: (item) => <span className="font-extrabold">{formatValue(item.name)}</span>,
              },
              { key: "category", header: "Category", render: (item) => formatValue(item.category) },
              { key: "language", header: "Language", render: (item) => formatValue(item.language) },
            ]}
          />
        </article>
        <article>
          <h2 className="mb-3 text-base font-extrabold text-slate-950">Recent bookings</h2>
          <DataTable
            items={recentBookings}
            getKey={(item) => item.id}
            empty={<EmptyState title="No bookings found" description="The bookings endpoint returned no records." />}
            columns={[
              { key: "id", header: "Booking ID", render: (item) => formatValue(item.id) },
              { key: "date", header: "Date", render: (item) => formatValue(item.bookingDate) },
              {
                key: "status",
                header: "Status",
                render: (item) => <StatusBadge status={item.status} />,
              },
            ]}
          />
        </article>
      </div>
    </section>
  );
};

export const AdminServices = () => {
  const query = useAdminServices();
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState<AdminService | null>(null);
  const [teacherId, setTeacherId] = useState<string | number>();
  const detail = useAdminService(selected?.id);
  const teacherServices = useAdminTeacherServices(teacherId);

  const search = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const language = params.get("language") ?? "";
  const active = params.get("active") ?? "";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const items = query.data ?? [];
  const filtered = items.filter((item) => {
    const text = `${item.name ?? ""} ${item.description ?? ""}`.toLowerCase();
    const matchesSearch = !search || text.includes(search.toLowerCase());
    const matchesCategory = !category || item.category === category;
    const matchesLanguage = !language || item.language === language;
    const matchesActive =
      !active ||
      (active === "active" && item.isActive === true) ||
      (active === "inactive" && item.isActive === false);
    return matchesSearch && matchesCategory && matchesLanguage && matchesActive;
  });
  const { paged, page, pageCount, setPage } = usePagedItems(filtered);

  const columns: DataTableColumn<AdminService>[] = [
    {
      key: "name",
      header: "Name",
      render: (item) => (
        <div>
          <p className="font-extrabold text-slate-900">{formatValue(item.name)}</p>
          <p className="mt-1 line-clamp-2 max-w-sm text-xs text-slate-500">
            {formatValue(item.description)}
          </p>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (item) => formatValue(item.category) },
    { key: "language", header: "Language", render: (item) => formatValue(item.language) },
    { key: "duration", header: "Duration", render: (item) => formatValue(item.durationMinutes) },
    { key: "price", header: "Price", render: (item) => formatValue(item.price) },
  ];

  if (has(items, (item) => item.isActive)) {
    columns.push({
      key: "active",
      header: "State",
      render: (item) => <StatusBadge status={item.isActive} />,
    });
  }

  if (has(items, (item) => item.teacherId)) {
    columns.push({
      key: "teacher",
      header: "Teacher ID",
      render: (item) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setTeacherId(item.teacherId);
          }}
          className="font-extrabold text-haiti-navy underline-offset-2 hover:underline"
        >
          {formatValue(item.teacherId)}
        </button>
      ),
    });
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Platform Activity"
        title="Services"
        description="Read-only monitoring for all documented service fields. Owner-only edit and delete actions are intentionally not exposed."
      />
      <FilterBar>
        <SearchInput
          value={search}
          onChange={(value) => updateParam("q", value)}
          placeholder="Search name or description"
        />
        <SelectFilter label="All categories" value={category} onChange={(value) => updateParam("category", value)} options={uniqueOptions(items, (item) => item.category)} />
        <SelectFilter label="All languages" value={language} onChange={(value) => updateParam("language", value)} options={uniqueOptions(items, (item) => item.language)} />
        <SelectFilter label="All states" value={active} onChange={(value) => updateParam("active", value)} options={["active", "inactive"]} />
      </FilterBar>

      {query.isLoading ? <LoadingSkeleton /> : null}
      {query.isError ? <PartialError label="Services" error={query.error} onRetry={() => query.refetch()} /> : null}
      {!query.isLoading && !query.isError ? (
        <>
          <DataTable
            items={paged}
            columns={columns}
            getKey={(item) => item.id}
            onRowClick={setSelected}
            empty={<EmptyState title="No matching services" description="Adjust the filters or retry the services endpoint." />}
          />
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </>
      ) : null}

      <DetailsDrawer
        open={Boolean(selected)}
        title="Service details"
        description={selected ? `Service #${selected.id}` : undefined}
        onClose={() => setSelected(null)}
      >
        {detail.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {detail.isError ? <ErrorState message={getErrorMessage(detail.error)} onRetry={() => detail.refetch()} /> : null}
        {detail.data ? <RawDetails record={detail.data.raw} /> : selected ? <RawDetails record={selected.raw} /> : null}
      </DetailsDrawer>

      <DetailsDrawer
        open={teacherId !== undefined}
        title="Tutor services"
        description={teacherId !== undefined ? `Teacher #${teacherId}` : undefined}
        onClose={() => setTeacherId(undefined)}
      >
        {teacherServices.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {teacherServices.isError ? (
          <ErrorState message={getErrorMessage(teacherServices.error)} onRetry={() => teacherServices.refetch()} />
        ) : null}
        {teacherServices.data ? (
          <DataTable
            items={teacherServices.data}
            getKey={(item) => item.id}
            empty={<EmptyState title="No tutor services" description="The teacher service endpoint returned no records." />}
            columns={[
              { key: "name", header: "Name", render: (item) => formatValue(item.name) },
              { key: "category", header: "Category", render: (item) => formatValue(item.category) },
              { key: "language", header: "Language", render: (item) => formatValue(item.language) },
            ]}
          />
        ) : null}
      </DetailsDrawer>
    </section>
  );
};

export const AdminAvailability = () => {
  const query = useAdminAvailability();
  const [selected, setSelected] = useState<AdminAvailabilityRecord | null>(null);
  const [teacherId, setTeacherId] = useState<string | number>();
  const [teacherFilter, setTeacherFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const detail = useAdminAvailabilitySlot(selected?.id);
  const teacherAvailability = useAdminTeacherAvailability(teacherId);
  const items = query.data ?? [];
  const filtered = items.filter((item) => {
    const matchesTeacher = !teacherFilter || String(item.teacherId) === teacherFilter;
    const matchesDate = !dateFilter || item.date === dateFilter || item.day === dateFilter;
    return matchesTeacher && matchesDate;
  });
  const { paged, page, pageCount, setPage } = usePagedItems(filtered);

  const columns: DataTableColumn<AdminAvailabilityRecord>[] = [
    { key: "id", header: "ID", render: (item) => formatValue(item.id) },
    ...(has(items, (item) => item.teacherId)
      ? [{
          key: "teacher",
          header: "Tutor",
          render: (item: AdminAvailabilityRecord) => (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setTeacherId(item.teacherId);
              }}
              className="font-extrabold text-haiti-navy underline-offset-2 hover:underline"
            >
              {formatValue(item.teacherId)}
            </button>
          ),
        }]
      : []),
    ...(has(items, (item) => item.date)
      ? [{ key: "date", header: "Date", render: (item: AdminAvailabilityRecord) => formatValue(item.date) }]
      : []),
    ...(has(items, (item) => item.day)
      ? [{ key: "day", header: "Day", render: (item: AdminAvailabilityRecord) => formatValue(item.day) }]
      : []),
    { key: "start", header: "Start", render: (item) => formatValue(item.startTime) },
    { key: "end", header: "End", render: (item) => formatValue(item.endTime) },
    ...(has(items, (item) => item.isActive)
      ? [{ key: "state", header: "State", render: (item: AdminAvailabilityRecord) => <StatusBadge status={item.isActive} /> }]
      : []),
  ];

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Platform Activity"
        title="Availability"
        description="Read-only tutor availability inspection using the documented availability endpoints."
      />
      <FilterBar>
        <SelectFilter label="All tutors" value={teacherFilter} onChange={setTeacherFilter} options={uniqueOptions(items, (item) => item.teacherId)} />
        <SelectFilter label="All dates/days" value={dateFilter} onChange={setDateFilter} options={uniqueOptions(items, (item) => item.date ?? item.day)} />
      </FilterBar>
      {query.isLoading ? <LoadingSkeleton /> : null}
      {query.isError ? <PartialError label="Availability" error={query.error} onRetry={() => query.refetch()} /> : null}
      {!query.isLoading && !query.isError ? (
        <>
          <DataTable
            items={paged}
            columns={columns}
            getKey={(item) => item.id}
            onRowClick={setSelected}
            empty={<EmptyState title="No availability records" description="No records matched the current filters." />}
          />
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </>
      ) : null}

      <DetailsDrawer open={Boolean(selected)} title="Availability details" onClose={() => setSelected(null)}>
        {detail.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {detail.isError ? <ErrorState message={getErrorMessage(detail.error)} onRetry={() => detail.refetch()} /> : null}
        {detail.data ? <RawDetails record={detail.data.raw} /> : selected ? <RawDetails record={selected.raw} /> : null}
      </DetailsDrawer>

      <DetailsDrawer open={teacherId !== undefined} title="Tutor availability" description={teacherId !== undefined ? `Teacher #${teacherId}` : undefined} onClose={() => setTeacherId(undefined)}>
        {teacherAvailability.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {teacherAvailability.isError ? <ErrorState message={getErrorMessage(teacherAvailability.error)} onRetry={() => teacherAvailability.refetch()} /> : null}
        {teacherAvailability.data ? (
          <DataTable
            items={teacherAvailability.data}
            getKey={(item) => item.id}
            empty={<EmptyState title="No tutor availability" description="The teacher availability endpoint returned no records." />}
            columns={columns.filter((column) => column.key !== "teacher")}
          />
        ) : null}
      </DetailsDrawer>
    </section>
  );
};

export const AdminBookings = () => {
  const query = useAdminBookings();
  const [selected, setSelected] = useState<AdminBooking | null>(null);
  const [status, setStatus] = useState("");
  const [tutorId, setTutorId] = useState("");
  const [learnerId, setLearnerId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [date, setDate] = useState("");
  const [relatedTeacherId, setRelatedTeacherId] = useState<string | number>();
  const [relatedStudentId, setRelatedStudentId] = useState<string | number>();
  const detail = useAdminBooking(selected?.id);
  const teacherBookings = useAdminTeacherBookings(relatedTeacherId);
  const studentBookings = useAdminStudentBookings(relatedStudentId);
  const items = query.data ?? [];

  const filtered = items.filter((item) => {
    const matchesStatus = !status || item.status === status;
    const matchesTutor = !tutorId || String(item.teacherId ?? item.tutorId) === tutorId;
    const matchesLearner = !learnerId || String(item.learnerId ?? item.studentId) === learnerId;
    const matchesBooking = !bookingId || String(item.id).includes(bookingId);
    const matchesDate = !date || item.bookingDate === date;
    return matchesStatus && matchesTutor && matchesLearner && matchesBooking && matchesDate;
  });
  const { paged, page, pageCount, setPage } = usePagedItems(filtered);

  const columns: DataTableColumn<AdminBooking>[] = [
    { key: "id", header: "Booking ID", render: (item) => formatValue(item.id) },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    ...(has(items, (item) => item.bookingDate)
      ? [{ key: "date", header: "Date", render: (item: AdminBooking) => formatValue(item.bookingDate) }]
      : []),
    { key: "time", header: "Time", render: (item) => `${formatValue(item.startTime)} - ${formatValue(item.endTime)}` },
    {
      key: "tutor",
      header: "Tutor ID",
      render: (item) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setRelatedTeacherId(item.teacherId ?? item.tutorId);
          }}
          className="font-extrabold text-haiti-navy underline-offset-2 hover:underline"
        >
          {formatValue(item.teacherId ?? item.tutorId)}
        </button>
      ),
    },
    {
      key: "learner",
      header: "Learner ID",
      render: (item) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setRelatedStudentId(item.studentId ?? item.learnerId);
          }}
          className="font-extrabold text-haiti-navy underline-offset-2 hover:underline"
        >
          {formatValue(item.studentId ?? item.learnerId)}
        </button>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Platform Activity"
        title="Bookings"
        description="Read-only booking inspection. Mutation endpoints are documented, but admin authorization is not confirmed, so destructive and status actions are not shown."
      />
      <FilterBar>
        <SearchInput value={bookingId} onChange={setBookingId} placeholder="Search booking ID" />
        <SelectFilter label="All statuses" value={status} onChange={setStatus} options={uniqueOptions(items, (item) => item.status)} />
        <SelectFilter label="All tutors" value={tutorId} onChange={setTutorId} options={uniqueOptions(items, (item) => item.teacherId ?? item.tutorId)} />
        <SelectFilter label="All learners" value={learnerId} onChange={setLearnerId} options={uniqueOptions(items, (item) => item.studentId ?? item.learnerId)} />
        {has(items, (item) => item.bookingDate) ? (
          <SelectFilter label="All dates" value={date} onChange={setDate} options={uniqueOptions(items, (item) => item.bookingDate)} />
        ) : null}
      </FilterBar>
      {query.isLoading ? <LoadingSkeleton /> : null}
      {query.isError ? <PartialError label="Bookings" error={query.error} onRetry={() => query.refetch()} /> : null}
      {!query.isLoading && !query.isError ? (
        <>
          <DataTable
            items={paged}
            columns={columns}
            getKey={(item) => item.id}
            onRowClick={setSelected}
            empty={<EmptyState title="No bookings found" description="No records matched the current filters." />}
          />
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </>
      ) : null}

      <DetailsDrawer open={Boolean(selected)} title="Booking details" onClose={() => setSelected(null)}>
        {detail.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {detail.isError ? <ErrorState message={getErrorMessage(detail.error)} onRetry={() => detail.refetch()} /> : null}
        {detail.data ? <RawDetails record={detail.data.raw} /> : selected ? <RawDetails record={selected.raw} /> : null}
      </DetailsDrawer>

      <DetailsDrawer open={relatedTeacherId !== undefined} title="Tutor bookings" description={relatedTeacherId !== undefined ? `Teacher #${relatedTeacherId}` : undefined} onClose={() => setRelatedTeacherId(undefined)}>
        {teacherBookings.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {teacherBookings.isError ? <ErrorState message={getErrorMessage(teacherBookings.error)} onRetry={() => teacherBookings.refetch()} /> : null}
        {teacherBookings.data ? (
          <DataTable
            items={teacherBookings.data}
            getKey={(item) => item.id}
            empty={<EmptyState title="No tutor bookings" description="The teacher bookings endpoint returned no records." />}
            columns={columns}
          />
        ) : null}
      </DetailsDrawer>

      <DetailsDrawer open={relatedStudentId !== undefined} title="Learner bookings" description={relatedStudentId !== undefined ? `Student #${relatedStudentId}` : undefined} onClose={() => setRelatedStudentId(undefined)}>
        {studentBookings.isLoading ? <LoadingSkeleton rows={2} /> : null}
        {studentBookings.isError ? <ErrorState message={getErrorMessage(studentBookings.error)} onRetry={() => studentBookings.refetch()} /> : null}
        {studentBookings.data ? (
          <DataTable
            items={studentBookings.data}
            getKey={(item) => item.id}
            empty={<EmptyState title="No learner bookings" description="The student bookings endpoint returned no records." />}
            columns={columns}
          />
        ) : null}
      </DetailsDrawer>
    </section>
  );
};

const AdminFileCard = ({
  file,
  onDelete,
  isDeleting,
}: {
  file: AdminFile;
  onDelete: (file: AdminFile) => void;
  isDeleting: boolean;
}) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-haiti-navy">
          <FiFileText className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-slate-950">
            {formatValue(file.fileName ?? `File #${file.id}`)}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {formatValue(file.fileType)} • {formatBytes(file.fileSize)}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            Uploaded {formatDateTime(file.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        {file.fileUrl ? (
          <>
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-haiti-navy"
            >
              Open <FiExternalLink className="size-4" />
            </a>
            <a
              href={file.fileUrl}
              download={file.fileName}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-haiti-navy px-3 text-xs font-extrabold text-white transition hover:bg-haiti-navy-dark"
            >
              Download <FiDownload className="size-4" />
            </a>
          </>
        ) : null}
        {file.id ? (
          <button
            type="button"
            onClick={() => onDelete(file)}
            disabled={isDeleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-extrabold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiTrash2 className="size-4" />
            Delete
          </button>
        ) : null}
      </div>
    </div>
  </article>
);

const RequestCard = ({
  request,
  files,
  isLoadingFiles,
  onOpenDetails,
  onDeleteFile,
  isDeleting,
}: {
  request: AdminTranslationRequest;
  files: AdminFile[];
  isLoadingFiles: boolean;
  onOpenDetails: (request: AdminTranslationRequest) => void;
  onDeleteFile: (file: AdminFile) => void;
  isDeleting: boolean;
}) => (
  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-100 bg-linear-to-br from-white to-blue-50/40 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={request.status} />
            {isPendingStatus(request.status) ? (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-extrabold text-amber-700">
                Needs attention
              </span>
            ) : null}
          </div>
          <h2 className="mt-3 text-lg font-extrabold text-slate-950">
            {request.learnerName ?? request.learnerEmail ?? `Learner #${formatValue(request.learnerId)}`}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {request.sourceLanguage ?? "Source"} → {request.targetLanguage ?? "Target"} • Requested {formatDateTime(request.createdAt)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenDetails(request)}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-haiti-navy"
        >
          View details
        </button>
      </div>
      {request.notes || request.originalText ? (
        <p className="mt-4 line-clamp-2 max-w-4xl text-sm leading-6 text-slate-600">
          {request.notes ?? request.originalText}
        </p>
      ) : null}
    </div>
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">
          Attached files
        </p>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-600">
          {files.length} file{files.length === 1 ? "" : "s"}
        </span>
      </div>
      {isLoadingFiles ? (
        <LoadingSkeleton rows={2} />
      ) : files.length ? (
        <div className="grid gap-3">
          {files.map((file, index) => (
            <AdminFileCard
              key={String(file.id ?? `${request.id}-${index}`)}
              file={file}
              onDelete={onDeleteFile}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No files attached"
          description="This translation request does not currently have any uploaded files attached."
        />
      )}
    </div>
  </article>
);

export const AdminFiles = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<AdminTranslationRequest | null>(null);
  const requestsQuery = useAdminTranslationRequests();
  const requests = useMemo(() => byDateDesc(requestsQuery.data ?? []), [requestsQuery.data]);
  const requestIds = useMemo(() => requests.map((request) => request.id), [requests]);
  const fileQueries = useAdminTranslationRequestFileLists(requestIds);
  const deleteFile = useDeleteAdminFile();

  const filesByRequestId = useMemo(
    () =>
      new Map(
        requestIds.map((requestId, index) => [
          String(requestId),
          fileQueries[index]?.data ?? [],
        ]),
      ),
    [fileQueries, requestIds],
  );

  const allFiles = useMemo(
    () => [...filesByRequestId.values()].flat(),
    [filesByRequestId],
  );

  const visibleRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return requests.filter((request) => {
      const files = filesByRequestId.get(String(request.id)) ?? [];
      const matchesStatus = !status || request.status === status;
      const haystack = [
        request.learnerName,
        request.learnerEmail,
        request.learnerId,
        request.status,
        request.sourceLanguage,
        request.targetLanguage,
        request.notes,
        request.originalText,
        request.translatedText,
        ...files.map((file) => file.fileName),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!normalizedSearch || haystack.includes(normalizedSearch));
    });
  }, [filesByRequestId, requests, search, status]);

  const { paged, page, pageCount, setPage } = usePagedItems(visibleRequests);
  const pendingCount = requests.filter((request) => isPendingStatus(request.status)).length;
  const requestsWithFiles = requests.filter(
    (request) => (filesByRequestId.get(String(request.id)) ?? []).length > 0,
  ).length;
  const fileLoadError = fileQueries.find((query) => query.isError)?.error;
  const filesLoading = fileQueries.some((query) => query.isLoading);
  const selectedRequestFiles = selectedRequest
    ? filesByRequestId.get(String(selectedRequest.id)) ?? []
    : [];

  const handleDeleteFile = (file: AdminFile) => {
    if (!file.id) return;
    const confirmed = window.confirm(`Delete ${file.fileName ?? "this file"}?`);
    if (!confirmed) return;

    deleteFile.mutate(file.id, {
      onSuccess: () => toast.success("File deleted."),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Translation management"
        title="Translation Requests"
        description="Review learner translation requests, see pending work quickly, and manage every file attached to each real backend request."
        actions={
          <button
            type="button"
            onClick={() => {
              requestsQuery.refetch();
              fileQueries.forEach((query) => query.refetch());
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-haiti-navy px-4 text-sm font-extrabold text-white transition hover:bg-haiti-navy-dark"
          >
            <FiRefreshCw className="size-4" />
            Refresh
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total requests" value={requests.length} detail="Real translation requests" icon={FiFileText} />
        <StatCard label="Pending requests" value={pendingCount} detail="Requests needing attention" icon={FiClock} />
        <StatCard label="Attached files" value={allFiles.length} detail={`${requestsWithFiles} requests include files`} icon={FiLayers} />
      </div>

      <FilterBar>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <FiSearch className="size-4 shrink-0 text-slate-400" />
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search learner, email, status, language, notes, or file name..."
            label="Search translation requests"
          />
        </div>
        <SelectFilter
          label="All statuses"
          value={status}
          onChange={setStatus}
          options={uniqueOptions(requests, (request) => request.status)}
        />
      </FilterBar>

      {requestsQuery.isLoading ? <LoadingSkeleton rows={5} /> : null}
      {requestsQuery.isError ? (
        requestsQuery.error instanceof ApiError && requestsQuery.error.status === 403 ? (
          <PermissionDenied message={getErrorMessage(requestsQuery.error)} />
        ) : (
          <ErrorState
            title="Translation requests could not be loaded"
            message={getErrorMessage(requestsQuery.error)}
            onRetry={() => requestsQuery.refetch()}
          />
        )
      ) : null}
      {fileLoadError ? (
        <ErrorState
          title="Some request files could not be loaded"
          message={getErrorMessage(fileLoadError)}
        />
      ) : null}

      {!requestsQuery.isLoading && !requestsQuery.isError ? (
        visibleRequests.length ? (
          <div className="space-y-4">
            {paged.map((request) => (
              <RequestCard
                key={String(request.id)}
                request={request}
                files={filesByRequestId.get(String(request.id)) ?? []}
                isLoadingFiles={filesLoading}
                onOpenDetails={setSelectedRequest}
                onDeleteFile={handleDeleteFile}
                isDeleting={deleteFile.isPending}
              />
            ))}
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </div>
        ) : (
          <EmptyState
            title="No translation requests found"
            description="No real backend translation requests match the current search or status filter."
          />
        )
      ) : null}

      <DetailsDrawer
        open={Boolean(selectedRequest)}
        title="Translation request details"
        description={
          selectedRequest
            ? `${selectedRequest.learnerName ?? selectedRequest.learnerEmail ?? "Learner request"} • ${selectedRequest.status ?? "Unknown status"}`
            : undefined
        }
        onClose={() => setSelectedRequest(null)}
      >
        {selectedRequest ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Learner", selectedRequest.learnerName ?? selectedRequest.learnerEmail ?? selectedRequest.learnerId],
                ["Email", selectedRequest.learnerEmail],
                ["Status", selectedRequest.status],
                ["Language pair", `${selectedRequest.sourceLanguage ?? "Source"} → ${selectedRequest.targetLanguage ?? "Target"}`],
                ["Created", formatDateTime(selectedRequest.createdAt)],
                ["Updated", formatDateTime(selectedRequest.updatedAt)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">{label}</p>
                  <p className="mt-1 break-words text-sm font-bold text-slate-800">{formatValue(value)}</p>
                </div>
              ))}
            </div>

            {selectedRequest.notes || selectedRequest.originalText || selectedRequest.translatedText ? (
              <div className="space-y-3">
                {selectedRequest.notes ? (
                  <div className="rounded-lg border border-slate-100 p-3">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">Notes</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selectedRequest.notes}</p>
                  </div>
                ) : null}
                {selectedRequest.originalText ? (
                  <div className="rounded-lg border border-slate-100 p-3">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">Original text</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selectedRequest.originalText}</p>
                  </div>
                ) : null}
                {selectedRequest.translatedText ? (
                  <div className="rounded-lg border border-slate-100 p-3">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">Translated text</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selectedRequest.translatedText}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div>
              <h3 className="text-sm font-extrabold text-slate-950">Attached files</h3>
              <div className="mt-3 space-y-3">
                {selectedRequestFiles.length ? (
                  selectedRequestFiles.map((file, index) => (
                    <AdminFileCard
                      key={String(file.id ?? `${selectedRequest.id}-drawer-${index}`)}
                      file={file}
                      onDelete={handleDeleteFile}
                      isDeleting={deleteFile.isPending}
                    />
                  ))
                ) : (
                  <EmptyState title="No files attached" description="This request currently has no uploaded files." />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-950">Raw backend details</h3>
              <div className="mt-3">
                <RawDetails record={selectedRequest.raw} />
              </div>
            </div>
          </div>
        ) : null}
      </DetailsDrawer>
    </section>
  );
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AdminSettings = () => {
  const userQuery = useCurrentUser();
  const user = userQuery.data;
  const [infoDraft, setInfoDraft] = useState<{ fullName?: string; email?: string }>({});
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [infoSubmitPending, setInfoSubmitPending] = useState(false);
  const [infoSubmitNotice, setInfoSubmitNotice] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordSubmitPending, setPasswordSubmitPending] = useState(false);
  const [passwordSubmitNotice, setPasswordSubmitNotice] = useState("");

  const fullName = infoDraft.fullName ?? user?.full_name ?? "";
  const email = infoDraft.email ?? user?.email ?? "";

  const resetInfoForm = () => {
    setInfoDraft({});
    setInfoErrors({});
    setInfoSubmitNotice("");
  };

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
    setPasswordSubmitNotice("");
  };

  const handleSaveInfo = (event: FormEvent) => {
    event.preventDefault();
    if (infoSubmitPending) return;

    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = "Full name is required";
    else if (fullName.trim().length < 2) errors.fullName = "Full name must contain at least 2 characters";

    if (!email.trim()) errors.email = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim())) errors.email = "Please enter a valid email address";

    if (Object.keys(errors).length) {
      setInfoErrors(errors);
      setInfoSubmitNotice("");
      return;
    }

    setInfoErrors({});
    setInfoSubmitNotice("");
    setInfoSubmitPending(true);
    window.setTimeout(() => {
      setInfoSubmitPending(false);
      setInfoSubmitNotice("Profile editing is not available yet because the backend update API has not been implemented.");
    }, 800);
  };

  const handleUpdatePassword = (event: FormEvent) => {
    event.preventDefault();
    if (passwordSubmitPending) return;

    const errors: Record<string, string> = {};
    if (!currentPassword) errors.currentPassword = "Current password is required";
    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else {
      const rules = [
        [newPassword.length < 8, "New password must contain at least 8 characters"],
        [!/[A-Z]/.test(newPassword), "Must contain at least one uppercase letter"],
        [!/[a-z]/.test(newPassword), "Must contain at least one lowercase letter"],
        [!/[0-9]/.test(newPassword), "Must contain at least one number"],
      ] as const;
      errors.newPassword = rules.filter(([failed]) => failed).map(([, message]) => message).join(". ");
      if (!errors.newPassword) delete errors.newPassword;
    }
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
    else if (confirmPassword !== newPassword) errors.confirmPassword = "Passwords do not match";
    if (newPassword && currentPassword && newPassword === currentPassword) {
      errors.newPassword = "The new password must not be the same as the current password";
    }

    if (Object.keys(errors).length) {
      setPasswordErrors(errors);
      setPasswordSubmitNotice("");
      return;
    }

    setPasswordErrors({});
    setPasswordSubmitNotice("");
    setPasswordSubmitPending(true);
    window.setTimeout(() => {
      setPasswordSubmitPending(false);
      setPasswordSubmitNotice("Password updates are not available yet because the backend change-password API has not been implemented.");
    }, 800);
  };

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-haiti-navy px-5 py-7 text-white shadow-sm sm:px-8 sm:py-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Account settings</p>
        <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Admin Settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
          Manage your administrator profile and account security.
        </p>
      </div>

      {userQuery.isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      ) : userQuery.isError ? (
        <ErrorState title="Could not load settings data" message={getErrorMessage(userQuery.error)} onRetry={() => userQuery.refetch()} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <form onSubmit={handleSaveInfo} className="flex flex-1 flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-haiti-red">Personal info</span>
                    <h2 className="mt-1 text-lg font-extrabold text-slate-900">Personal Information</h2>
                    <p className="mt-1.5 text-xs font-semibold text-slate-400">Update your display name and registered email address.</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-haiti-navy">
                    <FiUser className="size-5" />
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => {
                        setInfoDraft((current) => ({ ...current, fullName: event.target.value }));
                        if (infoErrors.fullName) {
                          setInfoErrors((current) => {
                            const copy = { ...current };
                            delete copy.fullName;
                            return copy;
                          });
                        }
                      }}
                      className={`h-11 w-full rounded-xl border px-4 text-sm font-semibold text-slate-700 outline-none transition ${infoErrors.fullName ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50" : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"}`}
                      placeholder="Enter your full name"
                    />
                    {infoErrors.fullName ? <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-500"><FiAlertCircle />{infoErrors.fullName}</p> : null}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setInfoDraft((current) => ({ ...current, email: event.target.value }));
                        if (infoErrors.email) {
                          setInfoErrors((current) => {
                            const copy = { ...current };
                            delete copy.email;
                            return copy;
                          });
                        }
                      }}
                      className={`h-11 w-full rounded-xl border px-4 text-sm font-semibold text-slate-700 outline-none transition ${infoErrors.email ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50" : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"}`}
                      placeholder="Enter your email"
                    />
                    {infoErrors.email ? <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-500"><FiAlertCircle />{infoErrors.email}</p> : null}
                  </label>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                {infoSubmitNotice ? <div className="mb-4 flex gap-2.5 rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-xs font-semibold text-haiti-navy"><FiAlertCircle className="size-4 shrink-0 text-blue-600" /><span>{infoSubmitNotice}</span></div> : null}
                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={infoSubmitPending} className="inline-flex min-h-11 min-w-[7.5rem] items-center justify-center rounded-xl bg-haiti-navy px-5 text-sm font-bold text-white shadow-xs transition hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50">
                    {infoSubmitPending ? <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Save Changes"}
                  </button>
                  <button type="button" onClick={resetInfoForm} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </article>

          <article className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <form onSubmit={handleUpdatePassword} className="flex flex-1 flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-haiti-red">Security</span>
                    <h2 className="mt-1 text-lg font-extrabold text-slate-900">Password and Security</h2>
                    <p className="mt-1.5 text-xs font-semibold text-slate-400">Change your password to keep your admin account safe.</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600">
                    <FiKey className="size-5" />
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    ["Current Password", currentPassword, setCurrentPassword, showCurrent, setShowCurrent, "currentPassword"],
                    ["New Password", newPassword, setNewPassword, showNew, setShowNew, "newPassword"],
                    ["Confirm New Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm, "confirmPassword"],
                  ].map(([label, value, setValue, shown, setShown, key]) => (
                    <label key={String(key)} className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">{String(label)}</span>
                      <div className="relative">
                        <input
                          type={shown ? "text" : "password"}
                          value={String(value)}
                          onChange={(event) => {
                            (setValue as (value: string) => void)(event.target.value);
                            if (passwordErrors[String(key)]) {
                              setPasswordErrors((current) => {
                                const copy = { ...current };
                                delete copy[String(key)];
                                return copy;
                              });
                            }
                          }}
                          className={`h-11 w-full rounded-xl border pl-4 pr-11 text-sm font-semibold text-slate-700 outline-none transition ${passwordErrors[String(key)] ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50" : "border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-haiti-navy focus:bg-white"}`}
                          placeholder="••••••••"
                        />
                        <button type="button" onClick={() => (setShown as (value: boolean) => void)(!shown)} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600" aria-label={`${shown ? "Hide" : "Show"} ${String(label).toLowerCase()}`}>
                          {shown ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                        </button>
                      </div>
                      {passwordErrors[String(key)] ? <p className="mt-1.5 flex items-start gap-1 text-xs font-bold leading-snug text-red-500"><FiAlertCircle className="mt-0.5 shrink-0" /><span>{passwordErrors[String(key)]}</span></p> : null}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                {passwordSubmitNotice ? <div className="mb-4 flex gap-2.5 rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-xs font-semibold text-haiti-navy"><FiAlertCircle className="size-4 shrink-0 text-blue-600" /><span>{passwordSubmitNotice}</span></div> : null}
                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={passwordSubmitPending} className="inline-flex min-h-11 min-w-[8.5rem] items-center justify-center rounded-xl bg-haiti-navy px-5 text-sm font-bold text-white shadow-xs transition hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50">
                    {passwordSubmitPending ? <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : "Update Password"}
                  </button>
                  <button type="button" onClick={resetPasswordForm} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50">
                    Reset Form
                  </button>
                </div>
              </div>
            </form>
          </article>
        </div>
      )}
    </section>
  );
};
