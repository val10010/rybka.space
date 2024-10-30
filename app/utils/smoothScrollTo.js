export const smoothScrollTo = (id) => {
    if (id) {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
