import { signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const signIn = () => {
    const logGoogleUser = async () => {
        const {user} = await  signInWithGooglePopup()
     const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1> Sing In Page </h1>
            <button onClick={logGoogleUser}> Sign in with google popup</button>
        </div>
    )
};

export default signIn;