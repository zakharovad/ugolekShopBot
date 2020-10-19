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
 interface IIndexed {
     [key: string]: any;
     [key: number]: any;
 }
 export{
     IIndexed,
     Result,
     IError,
     IData
 }
