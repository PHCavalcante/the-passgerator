export function algorithm(lowercaseChecked:boolean, uppercaseChecked:boolean, numbersChecked:boolean, symbolsChecked:boolean, range:number){
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const upper = chars.toUpperCase();
    const numbers = "0123456789";
    const specialChars = "!@#$%&*_?|";
    const allchars = chars + upper + numbers + specialChars;

    let password = "";

        if (lowercaseChecked == true && uppercaseChecked == true && numbersChecked == true && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += allchars.charAt(Math.floor(Math.random() * allchars.length));
            }
            return password;
        }else if(lowercaseChecked == true && uppercaseChecked == true && numbersChecked == true && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += (chars + upper + numbers).charAt(Math.floor(Math.random() * (chars + upper + numbers).length));
            }
            return password;
        }else if(lowercaseChecked == true && uppercaseChecked == true && numbersChecked == false && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (chars + upper + specialChars).charAt(Math.floor(Math.random() * (chars + upper + specialChars).length));
            }
            return password;
        }else if(lowercaseChecked == true && uppercaseChecked == true && numbersChecked == false && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += (chars + upper).charAt(Math.floor(Math.random() * (chars + upper).length));
            }
            return password;
        }else if(lowercaseChecked == true && uppercaseChecked == false && numbersChecked == true && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (chars + numbers + specialChars).charAt(Math.floor(Math.random() * (chars + numbers + specialChars).length));
            }
            return password;
        }else if(lowercaseChecked == true && uppercaseChecked == false && numbersChecked == true && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += (chars + numbers).charAt(Math.floor(Math.random() * (chars + numbers).length));
            }
            return password;
        }else if (lowercaseChecked == true &&  uppercaseChecked == false && numbersChecked == false && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (chars + specialChars).charAt(Math.floor(Math.random() * (chars + specialChars).length));
            }
            return password;
        }else if (lowercaseChecked == true &&  uppercaseChecked == false && numbersChecked == false && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == true && numbersChecked == true && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (upper + numbers + specialChars).charAt(Math.floor(Math.random() * (upper + numbers + specialChars).length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == true && numbersChecked == true && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += (upper + numbers).charAt(Math.floor(Math.random() * (upper + numbers).length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == true && numbersChecked == false && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (upper + specialChars).charAt(Math.floor(Math.random() * (upper + specialChars).length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == true && numbersChecked == false && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += upper.charAt(Math.floor(Math.random() * upper.length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == false && numbersChecked == true && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (numbers + specialChars).charAt(Math.floor(Math.random() * (numbers + specialChars).length));
            }
            return password;
        }else if(lowercaseChecked == true &&  uppercaseChecked == false && numbersChecked == false && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += (chars + specialChars).charAt(Math.floor(Math.random() * (chars + specialChars).length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == false && numbersChecked == true && symbolsChecked == false){
            for (let x = 1; x<= range; x++){
                password += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == false && numbersChecked == false && symbolsChecked == true){
            for (let x = 1; x<= range; x++){
                password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
            }
            return password;
        }else if(lowercaseChecked == false &&  uppercaseChecked == false && numbersChecked == false && symbolsChecked == false){
        }
    return password;
}