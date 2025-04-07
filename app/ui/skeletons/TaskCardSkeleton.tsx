export function TaskCardSkeleton(){

    return (
        <div className={`bg-[#ddd] dark:bg-[#444] w-full h-14 flex justify-between gap-2 items-center rounded-md p-2`}>
            <div>
                <p className="h-6 bg-[#bbb] dark:bg-[#333] w-32"></p>
            </div>

            <div className="flex gap-2">
                <button className="h-9 w-14 bg-[#bbb] rounded-md dark:bg-[#333]"></button>
                
                <button className="h-9 w-14 bg-[#bbb] rounded-md dark:bg-[#333]"></button>
            </div>
        </div>
    );
}

export function TaskCardSkeletonList(){
    return (
        <div className="flex flex-col gap-2 py-2">
            <TaskCardSkeleton/>
            <TaskCardSkeleton/>
            <TaskCardSkeleton/>
            <TaskCardSkeleton/>
            <TaskCardSkeleton/>
        </div>
    );
}