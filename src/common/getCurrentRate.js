import { RATE_TAG, URL_RATE_API } from "@/utils/constants";

export default async function getActualRate() {
  try {
    const data = await fetch(URL_RATE_API).then((response) => response.json());
    return data.Valute[RATE_TAG];
  } catch (error) {
    throw new Error(error);
  }
}
