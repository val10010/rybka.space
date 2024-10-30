export const cls = (classNameSources, classKeys) => {
    const combinedKeys = classKeys.map(key => {
        return classNameSources.map(source => source[key]);
    }).flat();

    const uniqueKeys = [...new Set(combinedKeys)];

    return uniqueKeys.filter(Boolean).join(' ');
};


export const buildClassName = (classKeys = [], ...args) => cls(args, classKeys);
