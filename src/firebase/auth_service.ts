import { app } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User, signInWithEmailAndPassword } from "firebase/auth";

const fireBaseApp = app;

export type SocialName = 'Google' | 'Github';

class AuthService {
    login(socialName: SocialName) {
        let provider;
        const auth = getAuth();
        if (socialName === 'Google') provider = new GoogleAuthProvider();
        if (socialName === 'Github') provider = new GithubAuthProvider();
        return provider && signInWithPopup(auth, provider);
    }
    emailLogin(email: string, password: string) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }
    emailJoin(email: string, password: string) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password);
    }

    onAuthChange(onUserChanged: (arg0: User | null) => void) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            onUserChanged(user);
        });
    }

    logout() {
        const auth = getAuth();
        return signOut(auth);
    }
}

export default AuthService;