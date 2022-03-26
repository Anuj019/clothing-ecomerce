


import { signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { async } from '@firebase/util';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
 
    const logGoogleUser = async () => {
        const {user} = await  signInWithGooglePopup()
     const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1> Sing In Page </h1>
            <button onClick={logGoogleUser}> Sign in with google popup</button>
           <SignUpForm/>
        </div>
    )
};

export default SignIn;