  export const removeAfterAtSymbol = (email: string): string => {
    return email.replace(/@.*$/, '');
  };
  
 /*  // Example usage
  const email = 'example@example.com';
  const result = removeAfterAtSymbol(email);
  
  console.log(result); // Output: example 
  
  */
  
  
