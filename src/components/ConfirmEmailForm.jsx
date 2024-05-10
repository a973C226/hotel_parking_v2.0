const ConfirmEmailForm = () => {
    return (
        <form className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="confirmEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Подтверждение почты</label>
                <input type="name" name="confirmEmail" id="confirmEmail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="D42T6P" ></input>
            </div>
        </form>
    )
}

export { ConfirmEmailForm };