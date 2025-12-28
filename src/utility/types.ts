export type ValidatePasswordProps = {
    enteredPassword: string;
    savedPassword: string;
    salt: string;
};

export type GeneratePasswordProps = {
    password: string;
    salt: string;
};
