import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { IBlogsResponse, IBlogResponse } from "~/Models/IBlog";

class BlogsModule extends FetchFactory {
    async getAll(pageNumber: Ref<number>, pageSize: number, asyncDataOptions?: AsyncDataOptions<IBlogsResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IBlogsResponse>(
                    'GET',
                    `/api/blogs?pgSize=${pageSize}&pgNum=${pageNumber.value}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getById(blogId: string, asyncDataOptions?: AsyncDataOptions<IBlogResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IBlogResponse>(
                    'GET',
                    `/api/blogs/${blogId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

}

export default BlogsModule;