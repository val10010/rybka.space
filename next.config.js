const path = require('path')
const withNextIntl = require('next-intl/plugin')(
    './i18n/request.js'
);

module.exports = withNextIntl({
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
});
