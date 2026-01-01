export type ValidatePasswordProps = {
    enteredPassword: string;
    savedPassword: string;
};

export type GeneratePasswordProps = {
    password: string;
    salt: string;
};
