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

import { revalidatePath } from "next/cache";

export async function deleteGuest(id: string) {
  try {
    await prisma.guest.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting guest:", error);
    return { success: false, error: "Falha ao remover convidado." };
  }
}

import { cookies } from "next/headers";

export async function adminLogin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Palavra-passe incorrecta." };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  revalidatePath("/admin");
}
