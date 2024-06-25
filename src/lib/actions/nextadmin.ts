"use server";
import { ActionParams, ModelName } from "@premieroctet/next-admin";
import { deleteResourceItems, searchPaginatedResource, SearchPaginatedResourceParams, submitForm } from "@premieroctet/next-admin/dist/actions";
import { db } from "../db";
import { options } from "../admin-options";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
 
export const submitFormAction = async (
    params: ActionParams,
    formData: FormData
) => {
    return submitForm({ ...params, options: options, prisma: db }, formData);
};

export const submitEmail = async (
    model: ModelName,
    ids: number[] | string[]
) => {
    console.log("Sending email to " + ids.length + " users");
    await delay(1000);
};
  
export const deleteItem = async (
    model: ModelName,
    ids: string[] | number[]
) => {
    return deleteResourceItems(db, model, ids);
};
  
export const searchResource = async (
    actionParams: ActionParams,
    params: SearchPaginatedResourceParams
) => {
    return searchPaginatedResource({ ...actionParams, options, prisma: db }, params);
};