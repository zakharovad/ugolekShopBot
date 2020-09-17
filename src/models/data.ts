 interface IError {
    cod?: number,
    customData?: any,
    message: string

}
   interface IData {
     data:any;
     errors:Array<IError> ;
    status: string
}
class Result<T> implements  IData{
    data :T  =null;
    status ="";
    errors:Array<IError>  = [];
}
 export{
     Result,
     IError,
     IData
 }
