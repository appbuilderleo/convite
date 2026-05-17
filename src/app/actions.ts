"use server"

import { prisma } from "@/lib/prisma";

export async function submitRSVP(data: {
  name: string;
  phone: string;
  numberOfPeople: number;
  attendance: string;
  message: string;
  chosenGift: string;
}) {
  try {
    const guest = await prisma.guest.create({
      data: {
        name: data.name,
        phone: data.phone,
        numberOfPeople: data.numberOfPeople,
        attendance: data.attendance,
        message: data.message,
        chosenGift: data.chosenGift,
      },
    });
    return { success: true, guest };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return { success: false, error: "Falha ao enviar confirmação." };
  }
}
