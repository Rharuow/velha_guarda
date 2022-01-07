import { Char } from "../entities/Char";
import { User } from "../entities/User";

const userWithCharSerializer = (user: User, char: Char) => {
  try {
    return {
      user: {
        id: user.id,
        is_active: user.is_active,
        is_admin: user.is_admin,
        name: user.name,
        email: user.email,
        char: char,
      } as {
        id: string;
        is_active: boolean;
        is_admin: boolean;
        name: string;
        email: string;
        char: Char;
      },
    };
  } catch (error) {
    console.log("userWithCharSerializer error = ", error.message);
    throw new Error(` ${error.message}`);
  }
};

const userSerializer = (user: User) => {
  try {
    return {
      user: {
        id: user.id,
        is_active: user.is_active,
        is_admin: user.is_admin,
        name: user.name,
        email: user.email,
      } as {
        id: string;
        is_active: boolean;
        is_admin: boolean;
        name: string;
        email: string;
      },
    };
  } catch (error) {
    console.log("userSerializer error = ", error.message);
    throw new Error(` ${error.message}`);
  }
};

const userWithCharsSerializer = (user: User, chars: Array<Char>) => {
  try {
    return {
      user: {
        id: user.id,
        is_active: user.is_active,
        is_admin: user.is_admin,
        name: user.name,
        email: user.email,
        chars,
      } as {
        id: string;
        is_active: boolean;
        is_admin: boolean;
        name: string;
        email: string;
        chars: Array<Char>;
      },
    };
  } catch (error) {
    console.log("userWithCharSerializer error = ", error.message);
    throw new Error(` ${error.message}`);
  }
};

const usersWithCharsSerializer = (users: Array<User>) => {
  const usersSerilized = users.map((user) => ({
    id: user.id,
    is_active: user.is_active,
    is_admin: user.is_admin,
    name: user.name,
    email: user.email,
    chars: user.chars,
  }));

  try {
    return usersSerilized;
  } catch (error) {
    console.log("userWithCharSerializer error = ", error.message);
    throw new Error(` ${error.message}`);
  }
};

export {
  userWithCharSerializer,
  userSerializer,
  userWithCharsSerializer,
  usersWithCharsSerializer,
};
