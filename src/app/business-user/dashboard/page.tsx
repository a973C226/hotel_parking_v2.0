import { MainLayout } from "@premieroctet/next-admin";
import { getMainLayoutProps } from "@premieroctet/next-admin/dist/mainLayout";
import { BusinessUserOptions } from "@/lib/business-user-options";
import { db } from "@/lib/db";

const BusinessUserDashboardPage = async () => {
  const mainLayoutProps = getMainLayoutProps({
    options: BusinessUserOptions,
    isAppDir: true,
  });
  const totalUsers = await db.user.count();
  const totalTransport = await db.transport.count();
  const totalParking = await db.parking.count();
  const totalBooking = await db.booking.count();
  const totalPayment = await db.payment.count();

  const stats = [
    { name: "Пользователи", stat: totalUsers },
    { name: "Транспортные средства", stat: totalTransport },
    { name: "Парковки", stat: totalParking },
    { name: "Бронирования", stat: totalBooking },
    { name: "Платежи", stat: totalPayment },
  ];

  return (
    <MainLayout
      {...mainLayoutProps}
      user={{
        data: {
          name: "Бизнес-пользователь",
        },
        logoutUrl: "/auth/sign-in",
      }}
    >
      <div className="p-10">
        <h1 className="mb-4 text-xl font-bold leading-7 text-gray-900 dark:text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Административная панель
        </h1>
        <div className="mt-2">
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map(stat => (
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200">
                    {stat.stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BusinessUserDashboardPage;