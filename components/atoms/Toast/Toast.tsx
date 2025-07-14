import {Toaster} from "@ui/sonner";
import {ToasterProps} from "sonner";
import './toast.css';

export function ToastHandler(props: ToasterProps)
{
    return <Toaster {...props}
                    toastOptions={{
                        closeButton: true,
                        unstyled:    true,
                        classNames:  {
                            toast: "flex rounded shadow items-center gap-2 px-3 py-6",
                            closeButton: 'order-2 custom-toast-close-button border rounded p-[2px] cursor-pointer text-black border-black',
                            default: "bg-background",
                            error: "bg-error text-white"
                        }
                    }}
    >
        {props.children}
    </Toaster>
}