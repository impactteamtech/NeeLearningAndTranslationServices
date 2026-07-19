import { useEffect, useMemo, useState, useRef } from "react";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiGlobe,
  FiRefreshCw,
  FiSearch,
  FiSliders,
  FiUser,
  FiVideo,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useLearningServices } from "../../features/learner/learnerQueries";
import type { LearningServiceWithTutor } from "../../features/learner/learnerTypes";
import { LearnerBookingModal } from "./LearnerBookingModal";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatPrice = (price: number) => (price === 0 ? "Free" : money.format(price));
const formatDuration = (minutes: number) => {
  if (minutes <= 0) return "Flexible";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours} hr${hours > 1 ? "s" : ""}${rest ? ` ${rest} min` : ""}`;
};
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
const prettyLabel = (value: string) =>
  value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

type SelectFilterProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const SelectFilter = ({ label, value, options, onChange }: SelectFilterProps) => (
  <label className="relative block">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-haiti-navy focus:ring-4 focus:ring-blue-100 sm:min-w-40"
    >
      <option value="all">All {label.toLowerCase()}s</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <FiChevronDown className="pointer-events-none absolute right-3.5 top-4 size-4 text-slate-400" />
  </label>
);

const ServiceSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5">
    <div className="animate-pulse">
      <div className="flex justify-between">
        <div className="h-6 w-24 rounded-full bg-slate-100" />
        <div className="h-6 w-14 rounded bg-slate-100" />
      </div>
      <div className="mt-5 h-6 w-4/5 rounded bg-slate-100" />
      <div className="mt-3 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-3/5 rounded bg-slate-100" />
      <div className="my-5 h-px bg-slate-100" />
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-slate-100" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-slate-100" />
          <div className="h-3 w-20 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  </div>
);



const ServiceCard = ({
  service,
  onSelect,
}: {
  service: LearningServiceWithTutor;
  onSelect: () => void;
}) => {
  const isFree = service.price === 0;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View details for ${service.name}`}
      className="group flex min-h-[22rem] w-full flex-col overflow-hidden rounded-2xl border border-slate-200/85 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-haiti-navy hover:bg-slate-50/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy sm:p-6"
    >
      <div className="flex items-start justify-between gap-4 w-full">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-slate-600 ring-1 ring-slate-200/50">
          {service.category}
        </span>
        {isFree ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-600/10">
            Free Session
          </span>
        ) : (
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-haiti-navy ring-1 ring-haiti-navy/10">
            Paid Session
          </span>
        )}
      </div>

      <h2 className="mt-4 text-lg font-extrabold leading-snug text-slate-900 group-hover:text-haiti-navy group-focus:text-haiti-navy transition-colors">
        {service.name}
      </h2>
      
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500 font-semibold">
        {service.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 ring-1 ring-slate-100">
          <FiGlobe className="text-slate-400 size-3.5" /> {service.language}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 ring-1 ring-slate-100">
          <FiClock className="text-slate-400 size-3.5" /> {formatDuration(service.duration_minutes)}
        </span>
      </div>

      <div className="mt-auto border-t border-slate-100 pt-4 w-full">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-haiti-navy/10 text-xs font-extrabold text-haiti-navy">
              {initials(service.tutor.full_name)}
            </span>
            <div className="min-w-0">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <span className="truncate">{service.tutor.full_name}</span>
                {service.tutor.is_verified && (
                  <span title="Verified tutor" aria-label="Verified tutor" className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <FiCheck className="size-2.5" strokeWidth={3} />
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-slate-400">
                {service.tutor.years_of_experience} {service.tutor.years_of_experience === 1 ? "year" : "years"} exp
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="text-right">
              {isFree ? (
                <span className="block text-sm font-extrabold text-emerald-600 uppercase tracking-wide">Free</span>
              ) : (
                <span className="block text-base font-extrabold text-haiti-navy">{formatPrice(service.price)}</span>
              )}
            </div>
            <span className="grid size-8 place-items-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-haiti-navy group-hover:text-white group-focus:bg-haiti-navy group-focus:text-white">
              <FiArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {service.tutor.meeting_platform.map((platform) => (
            <span key={platform} className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[0.62rem] font-bold text-slate-500 uppercase tracking-wide">
              <FiVideo className="size-2.5 text-slate-400" /> {platform}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FiClock;
  label: string;
  value: string;
}) => (
  <div className="flex gap-3 rounded-xl bg-slate-50 p-3.5">
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-haiti-navy shadow-sm">
      <Icon className="size-4" />
    </span>
    <div>
      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const ServiceDetails = ({
  service,
  relatedServices,
  onClose,
  onBook,
}: {
  service: LearningServiceWithTutor;
  relatedServices: LearningServiceWithTutor[];
  onClose: () => void;
  onBook: () => void;
}) => {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="service-detail-title">
      <button type="button" aria-label="Close service details" onClick={onClose} className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />
      <article className="relative h-full w-full overflow-y-auto bg-white shadow-2xl sm:max-w-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-haiti-red">Service details</p>
            <p className="mt-0.5 text-sm text-slate-400">Everything you need to decide</p>
          </div>
          <button ref={(node) => node?.focus()} type="button" onClick={onClose} aria-label="Close details" className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy">
            <FiX className="size-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-haiti-navy">{service.category}</span>
          <h2 id="service-detail-title" className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">{service.name}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <DetailItem icon={FiClock} label="Duration" value={formatDuration(service.duration_minutes)} />
            <DetailItem icon={FiGlobe} label="Language" value={service.language} />
            <DetailItem icon={FiBookOpen} label="Category" value={service.category} />
            <DetailItem icon={FiAward} label="Price" value={formatPrice(service.price)} />
          </div>

          <section className="mt-8 border-t border-slate-100 pt-7">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Meet your tutor</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-haiti-navy text-base font-extrabold text-white shadow-[0_8px_20px_rgba(6,67,159,.2)]">
                {initials(service.tutor.full_name)}
              </span>
              <div>
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                  {service.tutor.full_name}
                  {service.tutor.is_verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-emerald-700">
                      <FiCheck strokeWidth={3} /> Verified
                    </span>
                  )}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                  <FiUser className="text-haiti-red" />
                  {service.tutor.years_of_experience} {service.tutor.years_of_experience === 1 ? "year" : "years"} of experience
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{service.tutor.bio || "This tutor has not added a bio yet."}</p>
          </section>

          <section className="mt-7">
            <h3 className="text-sm font-extrabold text-slate-900">Specializations</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.tutor.specialization.length ? service.tutor.specialization.map((item) => (
                <span key={item} className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-bold text-haiti-navy">{prettyLabel(item)}</span>
              )) : <span className="text-sm text-slate-400">No specializations listed.</span>}
            </div>
          </section>

          <section className="mt-7 rounded-2xl border border-slate-200 p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900"><FiVideo className="text-haiti-red" /> Available meeting platforms</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.tutor.meeting_platform.length ? service.tutor.meeting_platform.map((platform) => (
                <span key={platform} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">{platform}</span>
              )) : <span className="text-sm text-slate-400">Platform arranged with tutor.</span>}
            </div>
          </section>

          {relatedServices.length > 0 && (
            <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
              <h3 className="text-sm font-extrabold text-slate-900">More from this tutor</h3>
              <div className="mt-3 space-y-2">
                {relatedServices.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-sm">
                    <span className="min-w-0 truncate font-bold text-slate-700">{item.name}</span>
                    <span className="shrink-0 font-extrabold text-haiti-navy">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <button
            type="button"
            onClick={onBook}
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-haiti-navy text-sm font-bold text-white shadow-[0_8px_20px_rgba(6,67,159,.2)] transition hover:bg-haiti-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy"
          >
            Book This Service <FiArrowRight />
          </button>
        </div>
      </article>
    </div>
  );
};

export const LearnerServicesPage = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useLearningServices();
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("all");
  const [category, setCategory] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [activeOnly, setActiveOnly] = useState(true);
  const [selected, setSelected] = useState<LearningServiceWithTutor | null>(null);
  const [bookingService, setBookingService] = useState<LearningServiceWithTutor | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const SERVICES_PER_PAGE = 6;
  const servicesHeaderRef = useRef<HTMLDivElement | null>(null);

  // Reset pagination on filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, language, category, durationFilter, priceFilter, activeOnly]);

  const services = useMemo(() => data ?? [], [data]);
  const activeServiceCount = services.filter((service) => service.is_active).length;
  const languages = useMemo(() => [...new Set(services.map((service) => service.language))].sort(), [services]);
  const categories = useMemo(() => [...new Set(services.map((service) => service.category))].sort(), [services]);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return services.filter((service) => {
      const matchesSearch =
        !term ||
        service.name.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term);
      const matchesDuration =
        durationFilter === "all" ||
        (durationFilter === "Under 60 min" && service.duration_minutes < 60) ||
        (durationFilter === "60 min" && service.duration_minutes === 60) ||
        (durationFilter === "Over 60 min" && service.duration_minutes > 60);
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "Free" && service.price === 0) ||
        (priceFilter === "Under $25" && service.price > 0 && service.price < 25) ||
        (priceFilter === "$25 and up" && service.price >= 25);

      return (
        matchesSearch &&
        matchesDuration &&
        matchesPrice &&
        (!activeOnly || service.is_active) &&
        (language === "all" || service.language === language) &&
        (category === "all" || service.category === category)
      );
    });
  }, [activeOnly, category, durationFilter, language, priceFilter, search, services]);
  const hasFilters = Boolean(
    search ||
      language !== "all" ||
      category !== "all" ||
      durationFilter !== "all" ||
      priceFilter !== "all" ||
      !activeOnly,
  );

  const totalPages = Math.ceil(filtered.length / SERVICES_PER_PAGE);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * SERVICES_PER_PAGE;
    return filtered.slice(startIndex, startIndex + SERVICES_PER_PAGE);
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    servicesHeaderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const clearFilters = () => {
    setSearch("");
    setLanguage("all");
    setCategory("all");
    setDurationFilter("all");
    setPriceFilter("all");
    setActiveOnly(true);
  };

  return (
    <section>
      <div className="overflow-hidden rounded-3xl bg-haiti-navy px-5 py-7 text-white shadow-[0_18px_50px_rgba(6,67,159,.16)] sm:px-8 sm:py-9">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Explore services</p>
            <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Find the right support for your goals</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">Browse expert-led learning and language services, compare your options, and meet the tutor behind each session.</p>
          </div>
          {!isLoading && !isError && (
            <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-2xl font-extrabold">{activeServiceCount}</p>
              <p className="text-xs font-semibold text-blue-100">active services</p>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-2 -mt-2 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_12px_35px_rgba(15,23,42,.07)] sm:mx-5 sm:-mt-4 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(15rem,1fr)_auto_auto_auto_auto_auto]">
          <label className="relative">
            <span className="sr-only">Search services or tutors</span>
            <FiSearch className="absolute left-4 top-4 size-4 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search by service name or description..." className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-haiti-navy focus:bg-white focus:ring-4 focus:ring-blue-100" />
          </label>
          <SelectFilter label="Language" value={language} options={languages} onChange={setLanguage} />
          <SelectFilter label="Category" value={category} options={categories} onChange={setCategory} />
          <SelectFilter label="Duration" value={durationFilter} options={["Under 60 min", "60 min", "Over 60 min"]} onChange={setDurationFilter} />
          <SelectFilter label="Price" value={priceFilter} options={["Free", "Under $25", "$25 and up"]} onChange={setPriceFilter} />
          <label className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(event) => setActiveOnly(event.target.checked)}
              className="size-4 rounded border-slate-300 text-haiti-navy focus:ring-haiti-navy"
            />
            Active only
          </label>
        </div>
      </div>

      <div ref={servicesHeaderRef} className="mt-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Available services</h2>
          {!isLoading && !isError && <p className="mt-1 text-sm text-slate-500">Showing {filtered.length} {filtered.length === 1 ? "service" : "services"}</p>}
        </div>
        {hasFilters && <button type="button" onClick={clearFilters} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-haiti-navy transition hover:bg-blue-50"><FiSliders /> Clear filters</button>}
      </div>

      {isLoading && <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading services">{Array.from({ length: 6 }, (_, index) => <ServiceSkeleton key={index} />)}</div>}

      {isError && (
        <div className="mt-5 grid min-h-72 place-items-center rounded-3xl border border-red-100 bg-white p-8 text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-red-50 text-haiti-red"><FiRefreshCw className="size-5" /></span>
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">We couldn&apos;t load services</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{error instanceof Error ? error.message : "Please check your connection and try again."}</p>
            <button type="button" onClick={() => refetch()} disabled={isFetching} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-haiti-navy px-5 text-sm font-bold text-white transition hover:bg-haiti-navy-dark disabled:opacity-60"><FiRefreshCw className={isFetching ? "animate-spin" : ""} /> Try again</button>
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedServices.map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={() => setSelected(service)} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-between border-t border-slate-200/80 pt-6" aria-label="Pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy disabled:pointer-events-none disabled:opacity-50"
              >
                <FiChevronLeft className="size-4" />
                Previous
              </button>

              <div className="hidden sm:flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      aria-current={isActive ? "page" : undefined}
                      className={`grid size-10 place-items-center rounded-lg text-xs font-extrabold shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy ${
                        isActive
                          ? "bg-haiti-navy text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <div className="flex sm:hidden items-center text-xs font-extrabold text-slate-500">
                Page {currentPage} of {totalPages}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy disabled:pointer-events-none disabled:opacity-50"
              >
                Next
                <FiChevronRight className="size-4" />
              </button>
            </nav>
          )}
        </>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="mt-5 grid min-h-72 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-haiti-navy"><FiBookOpen className="size-6" /></span>
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">{services.length ? "No matching services" : "No services available yet"}</h2>
            <p className="mt-2 text-sm text-slate-500">{services.length ? "Try a different search or clear your filters." : "Please check back soon for new learning opportunities."}</p>
            {hasFilters && <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-haiti-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-haiti-navy-dark">Clear all filters</button>}
          </div>
        </div>
      )}

      {selected && (
        <ServiceDetails
          service={selected}
          relatedServices={services.filter((service) => service.id !== selected.id && service.tutor.id === selected.tutor.id)}
          onClose={() => setSelected(null)}
          onBook={() => setBookingService(selected)}
        />
      )}
      {bookingService && (
        <LearnerBookingModal
          service={bookingService}
          onClose={() => setBookingService(null)}
        />
      )}
    </section>
  );
};
