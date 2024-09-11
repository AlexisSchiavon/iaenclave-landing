import { init } from '@emailjs/browser';

export const initEmailJS = () => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
        init(publicKey);
    } else {
        console.error('EmailJS public key is not defined');
    }
};