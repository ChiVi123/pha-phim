import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

type HelmetRef = ElementRef<typeof Helmet>;
type HelmetPropsWithoutRef = ComponentPropsWithoutRef<typeof Helmet> & {
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    metaType?: string | undefined;
    metaImage?: string | undefined;
};

const descriptionDefault =
    'PhaPhim - Trang web xem phim trực tuyến miễn phí chất lượng cao với giao diện trực quan, tốc độ tải trang nhanh, cùng kho phim với hơn 10.000+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem lại phút giây giải trí tuyệt vời cho bạn.';

const MetaData = forwardRef<HelmetRef, HelmetPropsWithoutRef>((props, forwardRef) => {
    const { metaTitle, metaDescription, metaType, metaImage, ...helmetProps } = props;
    const imageContent = metaImage?.includes('/uploads/')
        ? 'https://img.ophim.live' + metaImage
        : 'https://img.ophim.live/uploads/' + metaImage;

    return (
        <Helmet ref={forwardRef} {...helmetProps}>
            <title>Pha Phim{metaTitle ? ` - ${metaTitle}` : ''}</title>
            <meta name='description' content={metaDescription || descriptionDefault} />
            {metaImage && <meta itemProp='image' content={imageContent} />}

            {metaType && <meta property='og:type' content={metaType} />}
            <meta property='og:title' content={`Pha Phim - ${metaTitle ? metaTitle : ''}`} />
            <meta property='og:description' content={metaDescription || descriptionDefault} />
            {metaImage && <meta property='og:image' content={imageContent} />}
        </Helmet>
    );
});
MetaData.displayName = 'MetaData';

export default MetaData;
