import loading from '@/public/loading.svg'
import Image from 'next/image'

export function Loading(){
    return (
        <div className="flex justify-center items-center h-10 overflow-hidden">
            <Image src={loading} alt="Loading..." />
        </div>
    )
}