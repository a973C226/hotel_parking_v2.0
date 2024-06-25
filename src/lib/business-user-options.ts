import { NextAdminOptions } from "@premieroctet/next-admin";

export const BusinessUserOptions: NextAdminOptions = {
	basePath: "/business-user",
	title: "⚡️ Hotel Parking Admin",
	model: {
		User: {
			toString: (user) => `${user.lastname} ${user.name} ${user.middlename}`,
			permissions: ["edit", "delete", "create"],
			title: "Пользователи",
			icon: "UsersIcon",
			aliases: {
				id: "ID",
				lastname: "Фамилия",
				name: "Имя",
				middlename: "Отчество",
				phoneNumber: "Номер телефона",
				birthdate: "Дата рождения",
				gender: "Пол",
				role: "Роль",
				password: "Пароль",
				isDeleted: "Удалено"
			},
			list: {
				display: ["id", "lastname", "name", "middlename", "email", "phoneNumber", "role", "isDeleted"],
				search: ["id", "lastname", "name", "middlename", "email", "phoneNumber"],
				copy: ["id", "email", "phoneNumber"],
				filters: [
					{
					  name: "Администраторы",
					  active: false,
					  value: {
							role: {
							equals: "ADMIN",
							},
					  },
					},
					{
						name: "Гости",
						active: false,
						value: {
							role: {
								equals: "GUEST",
							},
						},
					},
					{
						name: "Бизнес-пользователи",
						active: false,
						value: {
							role: {
								equals: "BUSiNESS_USER",
							},
						},
					},
				  ],
			},
			edit: {
				display: [
					"id",
					"username",
					"lastname", 
					"name", 
					"middlename", 
					"email", 
					"phoneNumber",
					"birthdate",
					"gender",
					"password",
					"role",
					"isDeleted",
					"transports",
				],
				styles: {
					_form: "grid-cols-3 gap-4 md:grid-cols-4 w-full",
					id: "col-span-2 row-start-1",
					username: "col-span-2 row-start-1",
					email: "col-span-2 row-start-2",
					transports: "col-span-4 row-start-5",
				},
				fields: {
					name: {
						required: true,
					},
					lastname: {
						required: true,
					},
					middlename: {
						required: true,
					},
					username: {
						required: true,
					},
					birthdate: {
						required: true,
					},
					gender: {
						required: true,
					},
					phoneNumber: {
						required: true,
					},
					role: {
						required: true,
					},
					email: {
						required: true,
					},
					password: {
						required: true,
						format: "password",
					},
				},
			},
		},
		Transport: {
			toString: (transport) => `${transport.brand} ${transport.model} ${transport.licensePlate}`,
			permissions: ["edit", "delete", "create"],
			title: "Транспортные средства",
			icon: "TruckIcon",
			aliases: {
				id: "ID",
				licensePlate: "ГРЗ",
				owner: "Владелец",
				brand: "Бренд",
				model: "Модель",
				color: "Цвет",
				isDeleted: "Удалено"
			},
			list: {
				display: ["id", "owner", "brand", "model", "color", "licensePlate", "isDeleted"],
				search: ["id", "owner", "brand", "model", "color", "licensePlate"],
			},
			edit: {
				display: [
					"id",
					"owner",
					"brand", 
					"model", 
					"color", 
					"licensePlate", 
					"isDeleted",
				],
				styles: {
					_form: "grid-cols-3 gap-4 md:grid-cols-4 w-full",
					id: "col-span-2 row-start-1",
					owner: "col-span-2 row-start-1",
					brand: "col-span-2 row-start-2",
					model: "col-span-2 row-start-2",
				},
				fields: {
					licensePlate: {
						required: true,
					},
					userId: {
						required: true,
					},
					brand: {
						required: true,
					},
					model: {
						required: true,
					},
					color: {
						required: true,
					},
				},
			},
		},
		Parking: {
			toString: (parking) => `${parking.parkingName}`,
			permissions: ["edit", "delete", "create"],
			title: "Парковки",
			icon: "HomeIcon",
			aliases: {
				id: "ID",
				parkingName: "Название",
				description: "Описание",
				parkingSpaces: "Кол-во мест",
				pricePerQuota: "Цена за час",
				coord_x: "Широта",
				coord_y: "Долгота"
			},
			list: {
				display: ["id", "parkingName", "parkingSpaces", "pricePerQuota"],
				search: ["id", "parkingName", "parkingSpaces", "pricePerQuota"],
			},
			edit: {
				display: [
					"id",
					"parkingName",
					"parkingSpaces", 
					"pricePerQuota", 
					"coord_x", 
					"coord_y", 
					"description",
				],
				styles: {
					_form: "grid-cols-3 gap-4 md:grid-cols-4 w-full",
					id: "col-span-2 row-start-1",
					parkingName: "col-span-2 row-start-1",
					description: "col-span-4 row-start-3",
				},
				fields: {
					parkingName: {
						required: true,
					},
					description: {
						required: true,
					},
					parkingSpaces: {
						required: true,
					},
					pricePerQuota: {
						required: true,
					},
					coord_x: {
						required: true,
					},
					coord_y: {
						required: true,
					},
				},
			},
		},
		Booking: {
			toString: (booking) => `${booking.bookingStart} - ${booking.bookingEnd}`,
			permissions: ["edit", "delete", "create"],
			title: "Бронирования",
			icon: "BookmarkIcon",
			aliases: {
				id: "ID",
				status: "Статус",
				createdAt: "Дата создания",
				bookingStart: "Начало действия",
				bookingEnd: "Окончание действия",
				bookingQuotas: "Кол-во квот",
				cost: "Стоимость",
				payment: "Платеж",
				user: "Пользователь",
				transport: "ТС",
				parking: "Парковка"
			},
			list: {
				display: ["id", "user", "bookingStart", "bookingEnd", "status", "transport", "parking"],
				search: ["id", "user", "bookingStart", "bookingEnd", "status", "transport", "parking"],
				fields: {
					user: {
						formatter: (user) => {
							return `${user.lastname} ${user.name} ${user.middlename}`
						},
					},
					transport: {
						formatter: (transport) => {
							return `${transport.brand} ${transport.model}`
						},
					},
					parking: {
						formatter: (parking) => {
							return `${parking.parkingName}`
						},
					},
					bookingStart: {
						formatter: (bookingStart) => {
							return new Date(bookingStart).toLocaleString()
						},
					},
					bookingEnd: {
						formatter: (bookingEnd) => {
							return new Date(bookingEnd).toLocaleString()
						},
					},
				},
			},
			edit: {
				display: [
					"id",
					"user",
					"transport", 
					"parking", 
					"bookingStart", 
					"bookingEnd", 
					"bookingQuotas",
					"cost",
					"payment",
					"status",
					"createdAt"
				],
				styles: {
					_form: "grid-cols-3 gap-4 md:grid-cols-4 w-full",
					id: "col-span-2 row-start-1",
					user: "col-span-2 row-start-1",
					transport: "col-span-2 row-start-2",
					parking: "col-span-2 row-start-2",
					payment: "col-span-2 row-start-4",
				},
				fields: {
					bookingStart: {
						required: true,
					},
					bookingEnd: {
						required: true,
					},
					bookingQuotas: {
						required: true,
					},
					cost: {
						required: true,
					},
					user: {
						required: true,
					},
					transport: {
						required: true,
					},
					parking: {
						required: true,
					},
				},
			},
		},
		Payment: {
			toString: (payment) => `${payment.id}`,
			permissions: [],
			title: "Платежи",
			icon: "CurrencyDollarIcon",
			aliases: {
				id: "ID",
				paymentId: "Идентификатор платежа в ЮКасса",
				status: "Статус",
				amount: "Сумма",
				currency: "Валюта",
				description: "Описание",
				user: "Пользователь",
				created_at: "Дата создания",
				confirmation_url: "Ссылка для оплаты",
				paid: "Признак оплаты",
				booking: "Бронирование"
			},
			list: {
				display: ["id", "user", "booking", "amount", "currency", "status"],
				search: ["id", "user", "booking", "amount", "currency", "status"],
				fields: {
					user: {
						formatter: (user) => {
							return `${user.lastname} ${user.name} ${user.middlename}`
						},
					},
				}
			},
			edit: {
				display: [
					"id",
					"paymentId",
					"status", 
					"amount", 
					"currency", 
					"description", 
					"user",
					"paid",
					"confirmation_url",
					"created_at",
					"booking"
				],
				styles: {
					_form: "grid-cols-3 gap-4 md:grid-cols-4 w-full",
					id: "col-span-2 row-start-1",
					user: "col-span-2 row-start-1",
					booking: "col-span-2 row-start-2",
					amount: "row-start-2",
					currency: "row-start-2",
					paymentId: "col-span-2 row-start-3",
					confirmation_url: "col-span-2 row-start-3",
					description: "col-span-4 row-start-5",
				},
				fields: {
					created_at: {
						format: "date-time"
					}
				},
			},
		}
	},
	pages: {
		"/dashboard": {
			title: "Панель",
			icon: "PresentationChartBarIcon",
		},
	},
	sidebar: {
		groups: [
			{
				title: "Таблицы",
				models: ["User", "Transport", "Parking", "Booking", "Payment"],
			},
		],
	},
	defaultColorScheme: "dark",
};