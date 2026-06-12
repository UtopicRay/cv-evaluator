declare module 'bcrypt';

interface BcryptUtils {
  genSalt(rounds?: number): Promise<string>;
  hash(data: string, salt: string): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
  decrypt(password: string, encryptedText: string): Promise<string>;
}

export const utils: BcryptUtils;
