import { getEmployeeById, getEmployees } from "@/lib/api/employees/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  employeeIdSchema,
  insertEmployeeParams,
  updateEmployeeParams,
} from "@/lib/db/schema/employees";
import { createEmployee, deleteEmployee, updateEmployee } from "@/lib/api/employees/mutations";

export const employeesRouter = router({
  getEmployees: publicProcedure.query(async () => {
    return getEmployees();
  }),
  getEmployeeById: publicProcedure.input(employeeIdSchema).query(async ({ input }) => {
    return getEmployeeById(input.id);
  }),
  createEmployee: publicProcedure
    .input(insertEmployeeParams)
    .mutation(async ({ input }) => {
      return createEmployee(input);
    }),
  updateEmployee: publicProcedure
    .input(updateEmployeeParams)
    .mutation(async ({ input }) => {
      return updateEmployee(input.id, input);
    }),
  deleteEmployee: publicProcedure
    .input(employeeIdSchema)
    .mutation(async ({ input }) => {
      return deleteEmployee(input.id);
    }),
});
