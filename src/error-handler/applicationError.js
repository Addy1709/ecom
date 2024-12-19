export class MyApplicationError extends Error{
    //taking inbuilt Error class and adding  custom properties
constructor(message,code){
    //message is already under super clas "Error"
    super(message);
    this.code=code;//custom property

}
}