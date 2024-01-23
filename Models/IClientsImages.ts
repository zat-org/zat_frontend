interface IClientsImages {
    id: number,
    attributes: {
        images: { data: IStrapiImage[] }
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date
    }
}
interface IStrapiImage {
    id: number,
    attributes: {
        name: string,
        alternativeText: string,
        caption: string,
        width: number,
        height: number,
        formats: {
            small: {
                ext: string,
                url: string,
                hash: string,
                mime: string,
                name: string,
                path: string | null,
                size: number,
                width: number,
                height: number
            },
            thumbnail: {
                ext: string,
                url: string,
                hash: string,
                mime: string,
                name: string,
                path: string | null,
                size: number,
                width: number,
                height: number
            }
        },
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: string | null,
        provider: string,
        provider_metadata: string | null,
        createdAt: Date,
        updatedAt: Date
    }
}
export type { IClientsImages }; 