import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "../../lib/api/bookings.api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useAdminBookings = () =>
  useQuery({
    queryKey: queryKeys.admin.bookings,
    queryFn: bookingsApi.list,
    retry: 1,
  });

export const useAdminBooking = (bookingId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.booking(bookingId ?? "none"),
    queryFn: () => bookingsApi.getById(bookingId as number | string),
    enabled: bookingId !== undefined && bookingId !== "",
    retry: 1,
  });

export const useAdminStudentBookings = (studentId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.studentBookings(studentId ?? "none"),
    queryFn: () => bookingsApi.getByStudent(studentId as number | string),
    enabled: studentId !== undefined && studentId !== "",
    retry: 1,
  });

export const useAdminTeacherBookings = (teacherId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.teacherBookings(teacherId ?? "none"),
    queryFn: () => bookingsApi.getByTeacher(teacherId as number | string),
    enabled: teacherId !== undefined && teacherId !== "",
    retry: 1,
  });
