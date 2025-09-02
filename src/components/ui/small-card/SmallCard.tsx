import { ReactNode} from "react";
import cx from "@/libs/cx";
import Button from "../button/Button";


interface SmallCardProps{
    title: string;
    description: string;
    icon?: ReactNode;
    button?:string
    className?:{
        container?:string,
        title?:string,
        description?:string
        button?: string
    }
    
}

export default function SmallCard({title, description, icon, className, button}: SmallCardProps) {
    return (
        <div className={cx('flex items-center justify-between py-2.5 px-3 text-sm text-ob-white border border-ob-gray rounded-xl', className?.container)}> 
            <div className="flex items-center gap-x-2.5">
                {icon}
                <div className='flex flex-col'>
                    <p className={cx("font-medium",className?.title)}>{title}</p>
                    <span className={cx('text-ob-gray-2', className?.description)}>{description}</span>
                </div>
            </div>
            <Button className={cx("bg-ob-blue-3 px-2 py-1 rounded-full text-xs text-ob-white font-light",className?.button)}>
                {button}
            </Button>
        </div>
    )
}
