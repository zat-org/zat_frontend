import type { IError } from '~/Models/AuthModels';
import FetchFactory from '../factory';
import type { IResponse } from '~/Models/IResponse';
import type { ICreateMatchEstimation ,IGetEstimationResponse } from '~/Models/MatchEstimationsModels';

class EstimationsModule extends FetchFactory {
    useGetByIds() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false) ;
        const data = ref<IResponse<IGetEstimationResponse> | null>(null);
        const getData = async (matchId: number): Promise<unknown> => {
            const userStore = useUserStore()
            if(!userStore.user?.id || !userStore.jwtToken ){
                error.value = "برجاء تسجيل الدخول اولا."
                return;
            }
            error.value = null;
            pending.value = true;
            try {
                let res = await this.call<IResponse<IGetEstimationResponse>>(
                    'GET',
                    `/api/match-estimations?filters[match][id][$eq]=${matchId}&filters[user][id][$eq]=${userStore.user.id}`,
                    undefined, // body
                    {
                        headers: {
                        "Authorization":`Bearer ${userStore.jwtToken}`
                        }
                    }
                )
                data.value = res ;
            } catch (err) {
                console.error(err);
                data.value = null ;
                error.value = "تعذر تحميل البيانات برجاء المحاولة مرة اخري لاحقا."
            }
            finally {
                pending.value = false;
            }
        }
        return { error, pending, data,getData }
    }

    useSendEstimation() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false);

        const send = async (request: ICreateMatchEstimation): Promise<unknown> => {
            const userStore = useUserStore()
            if(!userStore.user?.id || !userStore.jwtToken ){
                error.value = "برجاء تسجيل الدخول اولا."
                return;
            }
            error.value = null;
            pending.value = true;
            let data = {
                winner_team:request.selectedWinnerId,
                best_player:request.bestPlayerId,
                user: userStore.user.id,
                match: request.matchId,
                countOf400: request.countOf400,
                countOfKaboots: request.countOfKaboots,
                countOfRedCards: request.countOfRedCards,
                loserScore: request.loserScore
            };
            try {
                let res = await this.call<unknown>(
                    'POST',
                    "/api/match-estimations",
                    {data}, // body
                    {headers: {
                        "Authorization":`Bearer ${userStore.jwtToken}`
                    }}
                )
                return res ;
            } catch (err: any) {
                let errorData = err.data as IError;
                if (errorData.error.name === "BadRequestError") {
                    error.value = errorData.error.details.message;
                } else {
                    error.value = "تعذر تسجيل الدخول برجاء المحاولة مرة اخري لاحقا."
                }
            }
            finally {
                pending.value = false;
            }
        }
        return { error, pending, send }
    }
}

export default EstimationsModule;