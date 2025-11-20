export function isEmail(value) {
    return value.includes('@');
}
  
export function isNotEmpty(value) {
    return value.trim() !== '';
}
  
export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}
  
export function isEqualToOtherValue(value, otherValue) {
    return value === otherValue;
}
export function isIdValid(value) {
    if (!value || typeof value !== 'string') {
        return false;
    }

    const regExp = /^[a-zA-Z0-9]+$/;

    return regExp.test(value);
}

export function isPasswordValid(value) {
    if (!value || typeof value !== 'string') {
        return false;
    }
    
    const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])[a-zA-Z0-9!@#$%^&*?_]{8,20}$/;

    return regExp.test(value);
}