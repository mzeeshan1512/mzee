import toast from "react-hot-toast";

const showSuccess = (message:string |any)=>{
    toast.dismiss()
    toast.success(message?.replaceAll(/[^\w\s']/g, ''))
}

const showError=(error:any)=>{
    let message = "Something went wrong, Try Again Later"
    if (error?.message && !error?.message?.includes("function")) {
        const regex = /[^a-zA-Z0-9]+/g;
         message = error?.message.replace(regex, " ");
    }
    if(typeof error ==="string")
    {
        message = error
    }
    toast.dismiss()
    toast.error(message?.replaceAll(/[^\w\s']/g, ''))
}

export {
    showSuccess,
    showError
}