export const InitArticles = async (prismaClient: any) => {
  await prismaClient.article.upsert({
    where: { title: 'The best Nestjs developer in the world,Asad' },
    update: {},
    create: {
      title: 'The best Nestjs developer in the world,Asad',
      body: 'Support by reading his articles and giving him feedbacks',
      description:
        "We are excited to share that today's he is going to realise his new article",
      published: true,
    },
  });
};
