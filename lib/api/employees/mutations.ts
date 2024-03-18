import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  EmployeeId, 
  NewEmployeeParams,
  UpdateEmployeeParams, 
  updateEmployeeSchema,
  insertEmployeeSchema, 
  employees,
  employeeIdSchema 
} from "@/lib/db/schema/employees";

export const createEmployee = async (employee: NewEmployeeParams) => {
  const newEmployee = insertEmployeeSchema.parse(employee);
  try {
    await db.insert(employees).values(newEmployee)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEmployee = async (id: EmployeeId, employee: UpdateEmployeeParams) => {
  const { id: employeeId } = employeeIdSchema.parse({ id });
  const newEmployee = updateEmployeeSchema.parse(employee);
  try {
    await db
     .update(employees)
     .set(newEmployee)
     .where(eq(employees.id, employeeId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEmployee = async (id: EmployeeId) => {
  const { id: employeeId } = employeeIdSchema.parse({ id });
  try {
    await db.delete(employees).where(eq(employees.id, employeeId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

