import { showError, showSuccess } from "../utils/toast"

const TryCatchHandler =( callBack:(e?: any) => void = () => {}, setState: (e?: any) => void = () => {}, Message:string)=>{
    setState(true)
    try {
        callBack()
        showSuccess(Message);
    } catch (error) {
        showError(error)
    }finally{
        setState(false)
    }
    
}

export {
    TryCatchHandler
}