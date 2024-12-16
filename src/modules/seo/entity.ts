export interface ISEOEntity {
    og_type: string;
    titleHead: string;
    seoSchema: {
        '@context': string;
        '@type': string;
        name: string;
        dateModified: string;
        dateCreated: string;
        url: string;
        datePublished: string;
        image: string;
        director: string;
    };
    descriptionHead: string;
    og_image: string[];
    updated_time: number;
    og_url: string;
}
