export const formatDate = (date: string) => {
   const newDate = new Date (date) ;

   return newDate.toLocaleString('ukr', {
      year :'2-digit',
      day : 'numeric',
      month : 'numeric'
   })
}