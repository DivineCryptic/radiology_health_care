import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRank,
  deleteRank,
  updateRank,
} from "@/lib/api/ranks/mutations";
import { 
  rankIdSchema,
  insertRankParams,
  updateRankParams 
} from "@/lib/db/schema/ranks";

export async function POST(req: Request) {
  try {
    const validatedData = insertRankParams.parse(await req.json());
    const { success } = await createRank(validatedData);

    revalidatePath("/ranks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(success, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateRankParams.parse(await req.json());
    const validatedParams = rankIdSchema.parse({ id });

    const { success } = await updateRank(validatedParams.id, validatedData);

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = rankIdSchema.parse({ id });
    const { success } = await deleteRank(validatedParams.id);

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
