export const enum LogLevel{
    INFO = 'INFO',
    DEBUG = 'DEBUG',
    WARN = 'WARN',
    ERROR = 'ERROR'      
}

interface ILogger{
    info(message: string, context?: Record<string, unknown> ):void
    debug(message:string, context?: Record<string, unknown>):void
    warn(message: string, context?: Record<string, unknown>):void
    error(message: string, error?:unknown):void
}

export class Logger implements ILogger{
    private readonly name:string;

    constructor(name:string){
        this.name= name;
    }

    private format( level:LogLevel , message: string):string{
        const timestamp = new Date().toISOString()
        return(`[${timestamp}] [${level}] [${this.name}] [${message}]`);
    }

    info(message: string, context?: Record<string, unknown> ):void{
        const formatted = this.format( LogLevel.INFO, message)
        console.log(formatted);
        if(context){
            console.log(context);
        }
    }

    debug(message:string, context?: Record<string, unknown>):void{
        const formatted = this.format(LogLevel.DEBUG, message)
        console.log(formatted);
        if(context){
            console.log(context);
        }   

    }

    warn(message: string, context?: Record<string, unknown>):void{
        const formatted = this.format(LogLevel.WARN, message)
        console.warn(formatted);
        if(context){
            console.log(context);
        }        
    }

    error(message: string, error?:unknown):void{
        const formatted= this.format(LogLevel.ERROR, message)
        console.error(formatted)
        if( error != undefined) {
        if (error instanceof Error) {
            console.error(error.message)
        } else {
            console.error(String(error))
        }
        }
    }
}
    export const logger = new Logger('Framework')

