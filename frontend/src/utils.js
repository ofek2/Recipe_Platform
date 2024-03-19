
  export function isEmail(username) {
    // Simple check to determine if the provided string is an email address
    return /\S+@\S+\.\S+/.test(username);
  }

  export function toEmailAddress(username) {
    const lowerUsername = username.toLowerCase();
    const isEmailFormat = /\S+@\S+\.\S+/.test(lowerUsername);
    return isEmailFormat ? lowerUsername : `${lowerUsername}@mail.com`;
    
  }