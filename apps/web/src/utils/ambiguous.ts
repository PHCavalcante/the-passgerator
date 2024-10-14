export function ambiguousAlgorithm(password:string){
    if((/[O]/.test(password) && /[0]/.test(password)) || ((/[l]/).test(password) && (/[1]/).test(password))){
        return true;
    }
    return false;
}