function ambiguousAlgorithm(password:string){
    if((/[O]/.test(password) && /[0]/.test(password)) || ((/[l]/).test(password) && (/[1]/).test(password))){
        return true;
    }
    return false;
}
function algorithm(lowercaseChecked:boolean, uppercaseChecked:boolean, numbersChecked:boolean, symbolsChecked:boolean, ambiguous:boolean, range:number){
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const upper = chars.toUpperCase();
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*(),.?:{}|<>";
    const allchars = chars + upper + numbers + specialChars;

    function hasNumbers(){
        return(/\d/.test(password)); 
    }
    function hasLowercase(){
        return(/[a-z]/.test(password));
    }
    function hasUppercase(){
        return(/[A-Z]/.test(password));
    }
    function hasSymbols(){
        return(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    }
    let password = "";
    let condition = 0;

        if (lowercaseChecked && uppercaseChecked && numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += allchars.charAt(Math.floor(Math.random() * allchars.length));
                }
                if(hasNumbers() && hasLowercase() && hasUppercase() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(lowercaseChecked && uppercaseChecked && numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (chars + upper + numbers).charAt(Math.floor(Math.random() * (chars + upper + numbers).length));
                }
                if(hasLowercase() && hasUppercase() && hasNumbers()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(lowercaseChecked && uppercaseChecked && !numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (chars + upper + specialChars).charAt(Math.floor(Math.random() * (chars + upper + specialChars).length));
                }
                if(hasLowercase() && hasUppercase() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(lowercaseChecked && uppercaseChecked && !numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (chars + upper).charAt(Math.floor(Math.random() * (chars + upper).length));
                }
                if(hasLowercase() && hasUppercase()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(lowercaseChecked && !uppercaseChecked && numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (chars + numbers + specialChars).charAt(Math.floor(Math.random() * (chars + numbers + specialChars).length));
                }
                if(hasLowercase() && hasNumbers() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(lowercaseChecked && !uppercaseChecked && numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (chars + numbers).charAt(Math.floor(Math.random() * (chars + numbers).length));
                }
                if(hasLowercase() && hasNumbers()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if (lowercaseChecked &&  !uppercaseChecked && !numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (chars + specialChars).charAt(Math.floor(Math.random() * (chars + specialChars).length));
                }
                if(hasLowercase() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if (lowercaseChecked &&  !uppercaseChecked && !numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                if(hasLowercase()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(!lowercaseChecked &&  uppercaseChecked && numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (upper + numbers + specialChars).charAt(Math.floor(Math.random() * (upper + numbers + specialChars).length));
                }
                if(hasUppercase() && hasNumbers() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(!lowercaseChecked &&  uppercaseChecked && numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (upper + numbers).charAt(Math.floor(Math.random() * (upper + numbers).length));
                }
                if(hasUppercase() && hasNumbers()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(!lowercaseChecked &&  uppercaseChecked && !numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (upper + specialChars).charAt(Math.floor(Math.random() * (upper + specialChars).length));
                }
                if(hasUppercase() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(!lowercaseChecked &&  uppercaseChecked && !numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += upper.charAt(Math.floor(Math.random() * upper.length));
                }
                if(hasUppercase()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(!lowercaseChecked &&  !uppercaseChecked && numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += (numbers + specialChars).charAt(Math.floor(Math.random() * (numbers + specialChars).length));
                }
                if(hasNumbers() && hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }
            return password;
        }else if(!lowercaseChecked &&  !uppercaseChecked && numbersChecked && !symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
                }
                if(hasNumbers()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }
            }            
            return password;
        }else if(!lowercaseChecked &&  !uppercaseChecked && !numbersChecked && symbolsChecked){
            while(condition == 0){
                password = "";
                for (let x = 1; x<= range; x++){
                    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
                }
                if(hasSymbols()){
                    condition = 1;
                    if(ambiguous){
                        if(ambiguousAlgorithm(password)){
                            condition = 0;
                        }
                    }
                }    
            }
            return password;
        }
    return password;
}

export { ambiguousAlgorithm, algorithm}