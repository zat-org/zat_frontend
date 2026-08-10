import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { IBlogsResponse, IBlogResponse } from '~/features/blogs/types/IBlog'

class BlogsModule extends FetchFactory {
  async getAll(pageNumber: Ref<number>, pageSize: number, asyncDataOptions?: AsyncDataOptions<IBlogsResponse>) {
    return this.asyncData(
      'blogs:all',
      () => this.get<IBlogsResponse>(`/api/blogs?pgSize=${pageSize}&pgNum=${pageNumber.value}`),
      asyncDataOptions,
    )
  }

  async getById(blogId: string, asyncDataOptions?: AsyncDataOptions<IBlogResponse>) {
    return this.asyncData(
      `blogs:${blogId}`,
      () => this.get<IBlogResponse>(`/api/blogs/${blogId}`),
      asyncDataOptions,
    )
  }
}

export default BlogsModule
