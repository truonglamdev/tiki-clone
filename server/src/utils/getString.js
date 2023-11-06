export const getString = (stringToken, regex) => {
    const result = stringToken.match(regex);
    return result ? result[1] : null;
};
