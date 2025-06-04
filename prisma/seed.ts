import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.photo.deleteMany();
  await prisma.photographer.deleteMany();

  const photographers = [
    {
      name: "Onisim Yeroshenko",
      city: "Novodnistrovsk",
      style: "Сімейна",
      price: 1253,
      experience: 2,
      ordersCount: 18,
      avatar: "/uploads/avatar1.jpg",
      about:
        "Маю індивідуальний підхід до кожної сім’ї. Знімаю тепло та душевно.",
      photos: [
        "/uploads/photo1_1.jpg",
        "/uploads/photo1_2.jpg",
        "/uploads/photo1_3.jpg",
      ],
    },
    {
      name: "Boguslava Shmorgun",
      city: "Debaltseve",
      style: "Фешн",
      price: 1383,
      experience: 13,
      ordersCount: 42,
      avatar: "/uploads/avatar2.jpg",
      about:
        "Мої роботи часто з’являються в модних журналах. Працюю зі стилістами.",
      photos: [
        "/uploads/photo2_1.jpg",
        "/uploads/photo2_2.jpg",
        "/uploads/photo2_3.jpg",
      ],
    },
    {
      name: "Avreliy Korsun",
      city: "Odesa",
      style: "Сімейна",
      price: 1618,
      experience: 10,
      ordersCount: 28,
      avatar: "/uploads/avatar3.jpg",
      about: "Фіксую найщиріші емоції в сімейних фотосесіях на природі.",
      photos: [
        "/uploads/photo3_1.jpg",
        "/uploads/photo3_2.jpg",
        "/uploads/photo3_3.jpg",
      ],
    },
    {
      name: "Yustym Derhach",
      city: "Vyshneve",
      style: "Фешн",
      price: 2297,
      experience: 13,
      ordersCount: 59,
      avatar: "/uploads/avatar4.jpg",
      about:
        "Створюю унікальні образи для fashion-зйомок. Мінімалізм та стиль.",
      photos: [
        "/uploads/photo4_1.jpg",
        "/uploads/photo4_2.jpg",
        "/uploads/photo4_3.jpg",
      ],
    },
    {
      name: "Alla Kyrylenko",
      city: "Nizhyn",
      style: "Сімейна",
      price: 2457,
      experience: 4,
      ordersCount: 48,
      avatar: "/uploads/avatar5.jpg",
      about:
        "Люблю затишні фотосесії у квартирах та студіях. Природне світло — моє все.",
      photos: [
        "/uploads/photo5_1.jpg",
        "/uploads/photo5_2.jpg",
        "/uploads/photo5_3.jpg",
      ],
    },
    {
      name: "Svitlana Rudyck",
      city: "Lutsk",
      style: "Весілля",
      price: 1900,
      experience: 5,
      ordersCount: 33,
      avatar: "/uploads/avatar6.jpg",
      about: "Весільні історії — моя пристрасть. Роблю кожен кадр як у кіно.",
      photos: [
        "/uploads/photo6_1.jpg",
        "/uploads/photo6_2.jpg",
        "/uploads/photo6_3.jpg",
      ],
    },
    {
      name: "Ostap Melnychuk",
      city: "Ternopil",
      style: "Портрет",
      price: 1499,
      experience: 6,
      ordersCount: 22,
      avatar: "/uploads/avatar7.jpg",
      about:
        "Передаю глибину характеру у портретах. Працюю з новачками та моделями.",
      photos: [
        "/uploads/photo7_1.jpg",
        "/uploads/photo7_2.jpg",
        "/uploads/photo7_3.jpg",
      ],
    },
    {
      name: "Daryna Lytvyn",
      city: "Rivne",
      style: "Фешн",
      price: 2700,
      experience: 11,
      ordersCount: 61,
      avatar: "/uploads/avatar8.jpg",
      about: "Модні зйомки з акцентом на креатив. Завжди шукаю нові локації.",
      photos: [
        "/uploads/photo8_1.jpg",
        "/uploads/photo8_2.jpg",
        "/uploads/photo8_3.jpg",
      ],
    },
    {
      name: "Hanna Stetsenko",
      city: "Khmelnytskyi",
      style: "Портрет",
      price: 1420,
      experience: 3,
      ordersCount: 19,
      avatar: "/uploads/avatar9.jpg",
      about:
        "Допомагаю людям розкриватися перед камерою. Спокійна, дружня атмосфера.",
      photos: [
        "/uploads/photo9_1.jpg",
        "/uploads/photo9_2.jpg",
        "/uploads/photo9_3.jpg",
      ],
    },
    {
      name: "Mykhailo Huzar",
      city: "Ivano-Frankivsk",
      style: "Весілля",
      price: 2000,
      experience: 8,
      ordersCount: 36,
      avatar: "/uploads/avatar10.jpg",
      about:
        "Люблю ловити емоції в найважливіший день. Працюю швидко й професійно.",
      photos: [
        "/uploads/photo10_1.jpg",
        "/uploads/photo10_2.jpg",
        "/uploads/photo10_3.jpg",
      ],
    },
  ];

  for (const data of photographers) {
    const photographer = await prisma.photographer.create({
      data: {
        name: data.name,
        city: data.city,
        style: data.style,
        price: data.price,
        experience: data.experience,
        ordersCount: data.ordersCount,
        avatar: data.avatar,
        about: data.about,
      },
    });

    for (const url of data.photos) {
      await prisma.photo.create({
        data: {
          url,
          photographerId: photographer.id,
        },
      });
    }
  }

  console.log("Seed успішно завершено!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
