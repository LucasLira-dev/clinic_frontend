'use client';

import { getDoctors, getPatients } from "@/services/adminService"
import { useQuery } from "@tanstack/react-query"
import UsersTable from "./UsersTable"
import { AdminStats } from "./adminStats";
import { AdminStatsSkeleton } from "../skeletons/AdminStatsSkeleton";
import { UsersTableSkeleton } from "../skeletons/UsersTableSkeleton";


export const AdminContent = () => {

  const { data: doctorsData, isLoading, error, refetch: refetchDoctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })

  const { data: patientsData, isLoading: isLoadingPatients, error: errorPatients} = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  })

  if (isLoading || isLoadingPatients) {
   return (
    <>
        <AdminStatsSkeleton />
        <UsersTableSkeleton />
    </>
   )
  }

  return (
    <>
        <AdminStats totalDoctors={doctorsData?.length || 0} totalPatients={patientsData?.length || 0} weeklyAppointments={0} />
        <UsersTable doctorsData={doctorsData} isLoading={isLoading} error={error} patientsData={patientsData} isLoadingPatients={isLoadingPatients} errorPatients={errorPatients} refetchDoctors={refetchDoctors} />
    </>
  )
}