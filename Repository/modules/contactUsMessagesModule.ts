import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
type ContactUsMessage = {
    name: string,
    email: string,
    message: string,
    type: string
}
class ContactUsMessagesModule extends FetchFactory {
    private RESOURCE = `/api/contact-us-messages/`;

     useSendMessage() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false);
        const send = async (msg: ContactUsMessage): Promise<unknown> => {
            error.value = null;
            pending.value = true;
            try {
                return this.call<unknown>(
                    'POST',
                    `${this.RESOURCE}`,
                    { data: { ...msg, date: new Date(), handled: false } }, // body
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

}

export type { ContactUsMessage };
export default ContactUsMessagesModule;