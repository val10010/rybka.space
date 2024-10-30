import React from 'react';
import { buildClassName } from "@/utils/classNames";

import style from './popup.module.scss';

const Popup = ({ isOpen, onClose, children, classNames = {} }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={style.popupOverlay} onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${buildClassName(['popupContainer'], style, classNames)}`}
            >
                {children}
                {
                    <button className={`${buildClassName(['popupCloseBtn'], style, classNames)}`} onClick={onClose}>
                    </button>
                }
            </div>
        </div>
    );
};

export default Popup;
