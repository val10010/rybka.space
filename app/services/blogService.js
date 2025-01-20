// Здесь будет храниться временная база данных блога
// В реальном приложении эти данные должны храниться в базе данных
const blogPosts = [
    {
        id: 1,
        slug: 'yak-pravilno-vibrati-sportivnij-kostyum',
        title: 'Як правильно вибрати спортивний костюм',
        excerpt: 'Поради щодо вибору ідеального спортивного костюма: на що звернути увагу при покупці.',
        content: `
            <h2>На що звернути увагу при виборі спортивного костюма</h2>
            <p>Вибір правильного спортивного костюма - це важливе рішення, яке впливає на ваш комфорт під час тренувань та повсякденного носіння. Ось кілька ключових факторів, на які варто звернути увагу:</p>
            
            <h3>1. Матеріал</h3>
            <p>Перше, на що варто звернути увагу - це матеріал. Він повинен бути:</p>
            <ul>
                <li>Дихаючим</li>
                <li>Еластичним</li>
                <li>Зносостійким</li>
            </ul>
            
            <h3>2. Розмір</h3>
            <p>Правильний розмір - це запорука комфорту. Костюм не повинен обмежувати рухи, але і не має бути занадто вільним.</p>
        `,
        coverImage: '/blog/sportsuit-choice.jpg',
        date: '2024-01-16'
    },
    // Добавьте больше постов по необходимости
];

export async function getAllPosts(locale) {
    return blogPosts;
}

export async function getPostBySlug(slug, locale) {
    return blogPosts.find(post => post.slug === slug);
}

export async function getRecentPosts(locale, limit = 3) {
    return blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}
