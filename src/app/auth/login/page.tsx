'use client';

import { Button } from '@/components/ui/button';
import { LuGithub } from 'react-icons/lu';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import * as process from 'process';
import React from 'react';

export default function AuthPage() {
    const redirectUri =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth/login/callback'
            : 'https://blog-builder-theta.vercel.app/auth/login/callback';
    console.log('redirectUri', redirectUri);
    return (
        <div className={'w-full h-svh flex justify-center items-center'}>
            <Card>
                <CardHeader>
                    <CardTitle className={'text-2xl'}>
                        登入 &nbsp;
                        <span className={'text-primary'}>Blog Builder</span>
                    </CardTitle>
                    <CardDescription>
                        請授權 Github 登入，並開放相關權限以利後續操作
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        id="github-auth-link"
                        className={
                            'w-full flex flex-row space-x-2 bg-purple-800'
                        }
                        variant={'default'}
                        asChild
                    >
                        <Link
                            // id={'oauth-link'}
                            href={
                                'https://github.com/login/oauth/authorize?client_id=Iv23lijthGxIQVLnC65M&redirect_uri=' +
                                redirectUri
                            }
                        >
                            <p className={'text-[12px] text-white'}>
                                Github 登入
                            </p>
                            <LuGithub
                                className={'text-foreground text-white'}
                                size={24}
                            />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
