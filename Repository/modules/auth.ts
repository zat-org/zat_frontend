import type { IError, ILoginConfirmed, IUser } from '~/Models/AuthModels';
import FetchFactory from '../factory';

class AuthModule extends FetchFactory {
    useLogin() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false);
        const requestOtp = async (username: string): Promise<{ RequestId: string } | undefined> => {
            error.value = null;
            pending.value = true;
            try {
                let res = await this.call<{
                    RequestId: string
                }>(
                    'POST',
                    "/api/users-permissions/send-otp-using-qydha",
                    { username },
                )
                return res;
            } catch (err: any) {
                let errorData = err.data as IError;
                if (errorData.error.name === "BadRequestError" && errorData.error.details.code === "UserNotFound") {
                    error.value = "يوزر قيدها غير موجود."
                } else {
                    error.value = "تعذر الارسال برجاء المحاولة مرة اخري لاحقا."
                }
            }
            finally {
                pending.value = false;
            }
        }

        const confirmOtp = async (requestId: string, otp: string): Promise<ILoginConfirmed | undefined> => {
            error.value = null;
            pending.value = true;
            try {
                let res = await this.call<ILoginConfirmed>(
                    'POST',
                    "/api/users-permissions/qydha-login",
                    { RequestId: requestId, Otp: otp },
                )
                return res;
            } catch (err: any) {
                let errorData = err.data as IError;
                if (errorData.error.name === "BadRequestError") {
                    if (errorData.error.details.code === "OTPAlreadyUsedError")
                        error.value = "انتهت صلاحية هذا الرمز."
                    else if (errorData.error.details.code === "OTPExceededTimeLimit")
                        error.value = "انتهت صلاحية هذا الرمز."
                    else if (errorData.error.details.code === "IncorrectOTP")
                        error.value = "هذا الرمز غير صحيح."
                    else
                        error.value = "تعذر تسجيل الدخول برجاء المحاولة مرة اخري لاحقا."

                } else {
                    error.value = "تعذر تسجيل الدخول برجاء المحاولة مرة اخري لاحقا."
                }
            }
            finally {
                pending.value = false;
            }
        }

        const fetchAuthUserData = async (jwtToken: string): Promise<IUser | undefined> => {
            error.value = null;
            pending.value = true;
            try {
                let res = await this.call<IUser>(
                    'GET',
                    "/api/users/me", undefined,
                    {
                        headers: {
                            "authorization": `Bearer ${jwtToken}`
                        }
                    })
                return res;
            } catch (err: any) {
                console.error(err)
                error.value = "تعذر تحميل بيانات المستخدم برجاء تسجيل الدخول مرة اخرى";
            }
            finally {
                pending.value = false;
            }
        }
        return { error, pending, requestOtp, confirmOtp, fetchAuthUserData }
    }
}

export default AuthModule;