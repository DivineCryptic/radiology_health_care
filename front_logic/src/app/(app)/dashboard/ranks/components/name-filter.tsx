

import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import React from 'react'

interface NameFilterProps<TData>{
  table:Table<TData>;
}
function NameFilter<TData>({table}:NameFilterProps<TData>){
  return (
   <Input 
   placeholder="Search Name"
   value={table.getColumn("name")?.getFilterValue() as string || ""}
   onChange={(event)=>{table.getColumn("name")?.setFilterValue(event.target.value)}}
   />

  )
}

export default NameFilter;