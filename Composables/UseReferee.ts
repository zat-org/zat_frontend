import type { IReferee } from '@/Models/IReferee';

const UseReferee = () => {
    const error = ref<string | null>(null)
    const pending = ref(false)
    const client = useStrapiClient()
    

    const GetAll = async () => {
        error.value = null;
        pending.value = true;
        let data = await client(`/referees`, { method: 'GET' });
    }

    return { GetAll }
}

export default UseReferee;