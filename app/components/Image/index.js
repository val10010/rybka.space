"use client"

import React from 'react';

const ImageWithWebp = ({ src, ...props }) => {
    if(!src) return;

    const pathWithoutExtension = src.replace(/\.[^/.]+$/, '');
    const extension = src.substring(src.lastIndexOf('.') + 1);


    return (
        <picture>
            <source srcSet={pathWithoutExtension + '.webp' } type="image/webp"/>
            <img srcSet={src} loading="lazy" {...props}/>
        </picture>
    );
};

export default ImageWithWebp;
