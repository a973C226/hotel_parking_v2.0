
import { MainLayout } from "@premieroctet/next-admin";
import { getMainLayoutProps } from "@premieroctet/next-admin/dist/mainLayout";
import { options } from "@/lib/admin-options";
import { db } from "@/lib/db";

const AdminDashboardPage = async () => {
  const mainLayoutProps = getMainLayoutProps({
    options,
    isAppDir: true,
  });
  const totalUsers = await db.user.count();

  const stats = [
    { name: "Total Users", stat: totalUsers },
  ];

  return (
    <MainLayout
      {...mainLayoutProps}
      user={{
        data: {
          name: "USer",
        },
        logoutUrl: "/",
      }}
    >
      <div className="p-10">
        <h1 className="mb-4 text-xl font-bold leading-7 text-gray-900 dark:text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Административная панель
        </h1>
        <div className="mt-2">
          <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Users
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200">
                  {totalUsers}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Posts
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200">
                  59
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Categories
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200">
                  1
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardPage;