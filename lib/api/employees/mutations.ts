import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  EmployeeId, 
  NewEmployeeParams,
  UpdateEmployeeParams, 
  updateEmployeeSchema,
  insertEmployeeSchema, 
  employees,
  employeeIdSchema 
} from "@/lib/db/schema/employees";
import { getUserAuth } from "@/lib/auth/utils";

export const createEmployee = async (employee: NewEmployeeParams) => {
  const { session } = await getUserAuth();
  const newEmployee = insertEmployeeSchema.parse({ ...employee, userId: session?.user.id! });
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
  const { session } = await getUserAuth();
  const { id: employeeId } = employeeIdSchema.parse({ id });
  const newEmployee = updateEmployeeSchema.parse({ ...employee, userId: session?.user.id! });
  try {
    await db
     .update(employees)
     .set({...newEmployee, updatedAt: new Date() })
     .where(and(eq(employees.id, employeeId!), eq(employees.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEmployee = async (id: EmployeeId) => {
  const { session } = await getUserAuth();
  const { id: employeeId } = employeeIdSchema.parse({ id });
  try {
    await db.delete(employees).where(and(eq(employees.id, employeeId!), eq(employees.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

