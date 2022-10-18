export function validation(input){
    let errors ={};
    function validateEmail(value) {
      let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
     
        return validRegex.test(value);
    }
    if(input.name){
      if(!input.name.trim()){
        errors.name ="Enter the name please"
      }else if (input.name.length < 4) {
        errors.name = "Minimum 4 characters";
      }else if (input.name.length > 25) {
        errors.name = "Maximum 25 characters";
      }
    }
    if (!input.email.trim()) {
        errors.email = "Required field";
    }else if (!validateEmail(input.email)) {
        errors.email = "Enter a valid email";
    }
    if (!input.password.trim()) {
        errors.password = "Required field";
      }else if (input.password.length < 6) {
        errors.password = "Minimum 6 characters";
      }
    if(input.confirmPassword){  
    if (!input.confirmPassword.trim()) {
        errors.confirmPassword = "Required field";
      }else if (input.confirmPassword !== input.password) {
        errors.confirmPassword = "Passwords must match";
      }
    }  
    
   
    return errors;

    
}
