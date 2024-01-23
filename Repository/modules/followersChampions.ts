import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { IFollowerChampion, IFollowerChampionApplyRequest } from "~/Models/IFollowerChampion";
import type { IResponse } from "~/Models/IResponse";


class FollowersChampionsModule extends FetchFactory {
    async getAll(asyncDataOptions?: AsyncDataOptions<IResponse<IFollowerChampion[]>>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                // console.log("from repo before fetch.")
                return this.call<IResponse<IFollowerChampion[]>>(
                    'GET',
                    `/api/followers-champions?filters[IsApplyOpen][$eq]=true`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getById(champId: string, asyncDataOptions?: AsyncDataOptions<IResponse<IFollowerChampion>>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IResponse<IFollowerChampion>>(
                    'GET',
                    `/api/followers-champions/${champId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }


    useSendApplyRequest() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false);
        const send = async (request: IFollowerChampionApplyRequest, champId: number | null): Promise<unknown> => {
            error.value = null;
            pending.value = true;
            try {
                const fpAgeRange = this.getAgeRange(request.fpBirthDate);
                const spAgeRange = this.getAgeRange(request.spBirthDate);
                return this.call<unknown>(
                    'POST',
                    "/api/champion-join-requests",
                    { data: { ...request, date: new Date(), followers_champion: champId, fpAge: fpAgeRange, spAge: spAgeRange } },
                )
            } catch (err) {
                console.error(err);
                error.value = "تعذر الارسال برجاء المحاولة مرة اخري لاحقا."
            }
            finally {
                pending.value = false;
            }
        }
        return { error, pending, send }
    }

    getAgeRange = (birthDateStr: string): string => {
        const age: number = this.calculateAge(birthDateStr);
        if (age < 18)
            return " < 18"
        else if (age >= 18 && age < 24)
            return "18 ~ 23"
        else if (age >= 24 && age < 30)
            return "24 ~ 29"
        else if (age >= 30 && age < 37)
            return "30 ~ 36"
        else
            return " > 37"
    }

    calculateAge = (birthDateStr: string): number => {
        const birthDate: Date = new Date(birthDateStr);
        const currentDate: Date = new Date();
        const timeDiff: number = currentDate.getTime() - birthDate.getTime();
        const ageInMilliseconds: number = Math.floor(timeDiff);

        // Calculate the age in years, accounting for leap years
        const msPerYear: number = 365.25 * 24 * 60 * 60 * 1000;
        const age: number = Math.floor(ageInMilliseconds / msPerYear);

        return age;
    }

}

export default FollowersChampionsModule;