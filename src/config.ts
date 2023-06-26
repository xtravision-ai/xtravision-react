const packageJson = require('./package.json');

export const runtimeConfig = {
    PACKAGE_NAME: packageJson.name,
    PACKAGE_VERSION: packageJson.version,
};