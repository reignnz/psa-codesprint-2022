import zxcvbn from "zxcvbn";

const MIN_STRENGTH = parseInt(process.env.PASSWORD_MIN_STRENGTH!, 10);

export default function validatePassword(password: string): boolean {
    return zxcvbn(password).score >= MIN_STRENGTH;
}