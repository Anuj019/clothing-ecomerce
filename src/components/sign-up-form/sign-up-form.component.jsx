import { async } from "@firebase/util";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'



const defaultFormFields = {
    displayName : '' ,
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {
 const [ formFields, setFormFields ] = useState(defaultFormFields)
 const { displayName, email, password, confirmPassword} = formFields;

 


const resetFormFields = () => {
    setFormFields(defaultFormFields)
}

  const handleSubmit = async (event) => {
      event.preventDefault();
      if(password !== confirmPassword){
          alert("password dont match, try again!!")
          return;
      }
      try {
          const {user} = await createAuthUserWithEmailAndPassword(email, password);
        

          await createUserDocumentFromAuth(user, {displayName});
          resetFormFields();

      } catch (error) {
          if(error.code === 'auth/email-already-in-use') {
              alert('email is already in use, please proceed for sign in')
          }
          console.log(error.message,  error)
      }

  }

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormFields({...formFields, [name]: value})
 }
    return(
        <div className="sign-up-container">
            <h2>Don't Have an account  </h2>
            <span>Sign Up with your Email and Password </span>
            <form onSubmit={ handleSubmit}>
        
             <FormInput type="text" label="Display Name" required  onChange={handleChange} name="displayName" value={displayName}/>
        
             <FormInput type="email" label="Email" required onChange={handleChange} name="email" value={email}/>
          
             <FormInput type="password"  label="Password" required onChange={handleChange} name="password" value={password} />
            
             <FormInput type="password" label="Confirm Password" required  onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <Button  type="submit">Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;