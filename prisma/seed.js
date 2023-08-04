const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
    const language1 = await prisma.language.upsert({
        where: { name: "English" },
        update: {},
        create: { name: "English" },
    });

    const language2 = await prisma.language.upsert({
        where: { name: "German" },
        update: {},
        create: { name: "German" },
    });

    const password = await bcrypt.hash("password", 10);
    const user = await prisma.user.upsert({
        where: { email: "john.doe@example.com" },
        update: {},
        create: {
            email: "john.doe@example.com",
            name: "John Doe",
            password: password,
            vocabularies: {
                create: [
                    {
                        vocabulary: {
                            create: {
                                word: "Tiger",
                                meaning: "Tiger",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Tiger",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Giraffe",
                                meaning: "Giraffe",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Giraffe",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Monkey",
                                meaning: "Affe",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Monkey",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Kangaroo",
                                meaning: "Känguru",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Kangaroo",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Penguin",
                                meaning: "Pinguin",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Penguin",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Zebra",
                                meaning: "Zebra",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Zebra",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Dolphin",
                                meaning: "Delfin",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Dolphin",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Shark",
                                meaning: "Hai",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Shark",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Koala",
                                meaning: "Koala",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Koala",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Panda",
                                meaning: "Panda",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Panda",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Turtle",
                                meaning: "Schildkröte",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Turtle",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Lizard",
                                meaning: "Eidechse",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Lizard",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Crocodile",
                                meaning: "Krokodil",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Crocodile",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Polar Bear",
                                meaning: "Eisbär",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/PolarBear",
                            },
                        },
                    },
                    {
                        vocabulary: {
                            create: {
                                word: "Rabbit",
                                meaning: "Kaninchen",
                                word_language_id: 1,
                                meaning_language_id: 2,
                                image_url: "https://loremflickr.com/640/640/Rabbit",
                            },
                        },
                    },
                ],
            },

            flashcards: {
                create: [
                    {
                        flashcard: {
                            create: {
                                question: "What is the capital of France?",
                                answer: "Paris",
                                language_id: 1,
                            },
                        },
                    },

                    {
                        flashcard: {
                            create: {
                                question: "What is the largest country in the world?",
                                answer: "Russia",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the currency of Japan?",
                                answer: "Yen",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the highest mountain in the world?",
                                answer: "Mount Everest",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the currency of the United States?",
                                answer: "US Dollar",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the largest ocean in the world?",
                                answer: "Pacific Ocean",
                                language_id: 1,
                            },
                        },
                    },
                ],
            },
        },
    });

    console.log({ user, language1, language2 });
}

main()
    .then(() => {
        console.log("Seed successful");
    })
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
