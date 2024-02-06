import { prisma } from "@/lib/prisma";
import { schemaApiV1dbDELETE, schemaApiV1dbPOST } from "@/lib/validators/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const result = await prisma.task.findMany();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // validating request body
    const reqBody = await req.json();
    const data = schemaApiV1dbPOST.parse(reqBody);

    // writing to DB
    const result = await prisma.task.create({
      data,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // checking if error is a zod validation error
    return error instanceof z.ZodError
      ? NextResponse.json(error, { status: 400 })
      : NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // validating request body
    const reqBody = await req.json();
    const data = schemaApiV1dbPOST.parse(reqBody);

    // writing to DB
    const result = await prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // checking if error is a zod validation error
    return error instanceof z.ZodError
      ? NextResponse.json(error, { status: 400 })
      : NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // validating request body
    const reqBody = await req.json();
    const data = schemaApiV1dbDELETE.parse(reqBody);

    // deleting timetable from DB
    const result = await prisma.task.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // checking if error is a zod validation error
    return error instanceof z.ZodError
      ? NextResponse.json(error, { status: 400 })
      : NextResponse.json(error, { status: 500 });
  }
}
