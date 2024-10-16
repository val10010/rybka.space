const path = require('path');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
    [optimizedImages, {
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImagesInDev: true,
        responsive: {
            adapter: require('responsive-loader/sharp')
        }
    }],
    {
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        images: {
            disableStaticImages: true,
        },
        webpack(config) {
            return config;
        }
    }
]);
