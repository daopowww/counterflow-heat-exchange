import z, { ZodType } from "zod";

export { cn } from "cn";

export const getStorageData = <T extends ZodType>(
  key: string,
  schema: T,
  defaultValue: z.infer<T> | null,
) => {
  try {
    const rawItem = localStorage.getItem(key);

    if (rawItem === null) return defaultValue;

    const parsedJSON = JSON.parse(rawItem);
    const result = schema.safeParse(parsedJSON);

    if (!result.success) {
      return defaultValue;
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const setStorageData = <T extends ZodType>(
  key: string,
  data: z.infer<T>,
  schema: T,
) => {
  try {
    const parsedData = schema.safeParse(data);

    if (!parsedData.success) return;

    const dataJSON = JSON.stringify(parsedData.data);

    localStorage.setItem(key, dataJSON);
  } catch (e) {
    console.error(e);
    return;
  }
};
