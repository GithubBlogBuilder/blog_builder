import Link from 'next/link';
import React from 'react';
export function AppLogo() {
    return (
        <Link data-testid={'#startup-link'} href={'/'}>
            <div
                className={
                    'flex flex-row space-x-2 justify-center items-center'
                }
            >
                <div
                    className={
                        'w-8 h-8 rounded-md bg-blue-800 flex flex-col items-center justify-center'
                    }
                >
                    <p className={'text-white text-lg font-bold'}>B</p>
                </div>
                <p className={'text-sm text-primary font-semibold'}>
                    BlogBuilder
                </p>
            </div>
        </Link>
    );
}
