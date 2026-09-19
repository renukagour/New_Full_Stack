class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went Wrong",
        errors = [],
        errstack = " "
    ) { 
        //overriding fields
        super(message)
        this.statusCode=statusCode
        this.data=null //search for data field
        this.message=message
        this.success=false
        this.errors=errors

        if(errstack){
            this.stack=errstack
        }else{
            Error.captureStackTrace(this,this.constructor);
        }

    }
}

export {ApiError}