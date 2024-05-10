import { Button, Checkbox, Datepicker, Dropdown, Label, Select, TextInput } from "flowbite-react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";

const SignUpPersonalForm = () => {
    return (
        <form className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
                <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Антон" ></input>
            </div>
            <div>
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фамилия</label>
                <input type="lastname" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Королёв" ></input>
            </div>
            <div>
                <label htmlFor="middlename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Отчество</label>
                <input type="middlename" name="middlename" id="middlename" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Сергеевич" ></input>
                <div className="flex items-center gap-2 mt-2">
                    <Checkbox id="withoutMiddlename" />
                    <Label htmlFor="withoutMiddlename" className="flex">
                        У меня нет отчества&nbsp;
                    </Label>
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col w-1/2.5">
                    <label htmlFor="middlename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пол</label>
                    <Select id="gender" className="">
                        <option>Женский</option>
                        <option>Мужской</option>
                    </Select>
                </div>
                <div className="flex flex-col w-1/2.5">
                    <label htmlFor="middlename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата рождения</label>
                    <Datepicker language="ru-RU" labelTodayButton="Сегодня" labelClearButton="Очистить"/>
                </div>
            </div>
        </form>
    )
}

export { SignUpPersonalForm };