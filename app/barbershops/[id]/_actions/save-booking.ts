"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async ({
  barbershopId,
  date,
  serviceId,
  userId,
}: SaveBookingParams) => {
  await db.booking.create({
    data: {
      barbershopId,
      date,
      serviceId,
      userId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};
