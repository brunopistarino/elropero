// "use server";

// import prisma from "@/lib/prisma";

// export async function handleDelete(id: number) {
//   console.log("handleDelete", id);
//   const category = await prisma.category.findUnique({ where: { id: id } });
//   await prisma.category.update({
//     data: { name: category?.name + "=" },
//     where: { id: id },
//   });
//   console.log("handleDelete");
// }
