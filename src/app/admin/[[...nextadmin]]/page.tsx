import { getPropsFromParams } from "@premieroctet/next-admin/dist/appRouter";
import schema from "@/../prisma/json-schema/json-schema.json"
import { db } from "@/lib/db";
import { NextAdmin } from "@premieroctet/next-admin";
import { deleteItem, searchResource, submitFormAction } from "@/lib/actions/nextadmin";
import { options } from "@/lib/admin-options";


export default async function AdminPage({
    params,
    searchParams,
}: {
    params: { [key: string]: string[] };
    searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
    const props = await getPropsFromParams({
        params: params.nextadmin,
        searchParams: searchParams,
        options: options,
        schema: schema,
        prisma: db,
        action: submitFormAction,
        deleteAction: deleteItem,
        searchPaginatedResourceAction: searchResource,
    });
    return (
        <>
            {props!=undefined && <NextAdmin {...props} />}
        </>
    );
}