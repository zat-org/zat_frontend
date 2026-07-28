import type { $Fetch, FetchOptions } from 'ofetch'
import type { AsyncDataOptions } from '#app'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestBody = object | FormData | null | undefined

class FetchFactory {
  protected client: $Fetch

  constructor(client: $Fetch) {
    this.client = client
  }

  protected call<T>(
    method: HttpMethod | string,
    url: string,
    data?: RequestBody,
    fetchOptions?: FetchOptions<'json'>,
  ): Promise<T> {
    return this.client<T>(url, {
      method,
      body: data ?? undefined,
      ...fetchOptions,
    })
  }

  protected get<T>(url: string, fetchOptions?: FetchOptions<'json'>) {
    return this.call<T>('GET', url, undefined, fetchOptions)
  }

  protected post<T>(url: string, data?: RequestBody, fetchOptions?: FetchOptions<'json'>) {
    return this.call<T>('POST', url, data, fetchOptions)
  }

  protected put<T>(url: string, data?: RequestBody, fetchOptions?: FetchOptions<'json'>) {
    return this.call<T>('PUT', url, data, fetchOptions)
  }

  protected delete<T>(url: string, fetchOptions?: FetchOptions<'json'>) {
    return this.call<T>('DELETE', url, undefined, fetchOptions)
  }

  protected asyncData<T>(
    key: string | (() => string),
    handler: () => Promise<T>,
    asyncDataOptions?: AsyncDataOptions<T>,
  ) {
    return useAsyncData(key, handler, asyncDataOptions)
  }
}

export default FetchFactory
