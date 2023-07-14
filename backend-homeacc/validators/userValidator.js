
export function isAValidUser(userInput) {
    let errors = [];

    if (userInput == null)
        errors.push("User input was null");

    if (errors.length == 0)
        return true;
    return false;
}
