type ProfileHeadProps = {
    user: any;
}

export default function ProfileHead({user}: ProfileHeadProps) {
    console.log(user)
    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <img className="rounded-full w-48 h-48 border-gray-900" src="https://www.1zoom.ru/big2/62/199578-yana.jpg"></img>
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl sm:text-4xl font-bold leading-none tracking-tight text-white space-x-2">
                    <span>{user.lastname}</span>
                    <span>{user.name}</span>
                    <span>{user.middlename}</span>
                </h1>
                <h3 className="text-xl font-normal leading-none tracking-tight text-white">{user.username}</h3>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl font-semibold leading-none tracking-tight text-white">26</h1>
                    <p className="text-white">броней</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl font-semibold leading-none tracking-tight text-white">3</h1>
                    <p className="text-white">транспорта</p>
                </div>
            </div>
        </div>
    )
}