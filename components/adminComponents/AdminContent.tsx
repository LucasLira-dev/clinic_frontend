'use client';

import { getDoctors, getPatients } from "@/services/adminService"
import { useQuery } from "@tanstack/react-query"
import UsersTable from "./UsersTable"
import { AdminStats } from "./adminStats";


export const AdminContent = () => {

  const { data: doctorsData, isLoading, error} = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })

  const { data: patientsData, isLoading: isLoadingPatients, error: errorPatients} = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  })

  return (
    <>
        <AdminStats totalDoctors={doctorsData?.length || 0} totalPatients={patientsData?.length || 0} weeklyAppointments={0} />
        <UsersTable doctorsData={doctorsData} isLoading={isLoading} error={error} patientsData={patientsData} isLoadingPatients={isLoadingPatients} errorPatients={errorPatients} />
    </>
  )
}