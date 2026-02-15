import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}
