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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg/600px-Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Giraffen.jpg/600px-Giraffen.jpg",
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
                                image_url:
                                    "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kangaroo_Australia_01_11_2008_-_retouch.JPG/440px-Kangaroo_Australia_01_11_2008_-_retouch.JPG",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Penguins_collage.png/520px-Penguins_collage.png",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/440px-Plains_Zebra_Equus_quagga.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/440px-Tursiops_truncatus_01.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/TDpGUipa.jpg/440px-TDpGUipa.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/480px-Koala_climbing_tree.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/440px-Grosser_Panda.JPG",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mocs%C3%A1ri_tekn%C5%91s_Kiserd%C5%91_2016.jpg/440px-Mocs%C3%A1ri_tekn%C5%91s_Kiserd%C5%91_2016.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chameleon_in_Berenty_Madagascar_0001.JPG/440px-Chameleon_in_Berenty_Madagascar_0001.JPG",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/440px-Nile_crocodile_head.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/440px-Polar_Bear_-_Alaska_%28cropped%29.jpg",
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
                                image_url:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/440px-Oryctolagus_cuniculus_Rcdo.jpg",
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
                                question: "What is the past tense of 'go'?",
                                answer: "Went",
                                topic: "Verbs",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the plural form of 'child'?",
                                answer: "Children",
                                topic: "Nouns",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What's the synonym of 'happy'?",
                                answer: "Joyful",
                                topic: "Vocabulary",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What does 'omnivore' mean?",
                                answer: "An animal that eats both plants and meat.",
                                topic: "Vocabulary",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the opposite of 'ancient'?",
                                answer: "Modern",
                                topic: "Adjectives",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question:
                                    "How do you turn the statement 'He is running.' into a question?",
                                answer: "Is he running?",
                                topic: "Sentence Structure",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the first person singular pronoun?",
                                answer: "I",
                                topic: "Pronouns",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What's the meaning of the idiom 'break the ice'?",
                                answer: "To initiate social interactions; to start a conversation.",
                                topic: "Idioms",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question: "What is the superlative form of 'bad'?",
                                answer: "Worst",
                                topic: "Adjectives",
                                language_id: 1,
                            },
                        },
                    },
                    {
                        flashcard: {
                            create: {
                                question:
                                    "Conjugate the verb 'to be' in present tense for 'he/she/it'.",
                                answer: "Is",
                                topic: "Verbs",
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
