'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useUserData } from '@/components/hooks/useUserData';
import { MarkdownEditFormField } from '@/app/dashboard/[issueNumber]/_components/MarkdownDisplay';
import { EmptyPostEntity, PostEntity } from '@/domain/entities/PostEntity';
import {
    createIssueAction,
    getIssuesWithIndex,
    updateIssueAction,
} from '@/actions/IssueAction';
import { Button } from '@/components/ui/button';
import { LuSaveAll, LuArrowLeft } from 'react-icons/lu';

import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { SectionHeader } from '@/app/dashboard/_components/SectionHeader';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { DeletePostButton } from '@/app/dashboard/[issueNumber]/_components/DeletePostButton';
import { TextInputField } from '@/app/deploy/_components/formField/TextFormField';

const formSchema = z.object({
    title: z.string(),
    // description: z.string(),
    // tags: z.array(z.string()),
    body: z.string(),
});

function FormSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className={'grow flex flex-col'}>
                {children}
            </CardContent>
        </Card>
    );
}

export default function PostPage({
    params,
}: {
    params: { issueNumber: string };
}) {
    const { userData, isSyncWithRemote } = useUserData();
    const [postData, setPostData] = useState<PostEntity>(EmptyPostEntity);
    const [isPostSyncWithRemote, startSyncWithRemote] = useTransition();
    const { toast } = useToast();
    const postNumber =
        params.issueNumber === 'create' ? 0 : parseInt(params.issueNumber);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const isCreateNewPost = postNumber === 0;
    const router = useRouter();

    const createIssueSuccessAction = (postNumber: number) => {
        console.log('create issue success');
        toast({
            title: '建立貼文成功',
            description: '貼文已經成功更新到 GitHub Issue 上面',
            duration: 2000,
        });
        router.replace(`/dashboard/${postNumber}`); // redirect to new post
    };

    const createIssueFailAction = () => {
        console.log('create issue fail');
        toast({
            title: '建立貼文失敗',
            description: '貼文建立失敗，請檢查資料是否正確',
            variant: 'destructive',
            duration: 2000,
        });
    };

    const updateIssueSuccessAction = () => {
        console.log('update issue success');
        toast({
            title: '更新貼文成功',
            description: '貼文已經成功更新到 GitHub Issue 上面',
            duration: 2000,
        });
    };

    const updateIssueFailAction = () => {
        console.log('update issue fail');
        toast({
            title: '更新貼文失敗',
            description: '貼文更新失敗，請檢查資料是否正確',
            variant: 'destructive',
            duration: 2000,
        });
    };

    useEffect(() => {
        if (isSyncWithRemote) {
            console.log('user is syncing with remote...');
            return;
        }
        console.log('synced with remote complete!');
        if (postNumber === 0) {
            console.log('create new post');
            setPostData(EmptyPostEntity);
            return;
        }
        startSyncWithRemote(async () => {
            console.log('syncing post data with remote...');
            const blogData = await getIssuesWithIndex(
                postNumber,
                userData.githubUser.userName,
                userData.blogRepoName ?? ''
            );

            if (blogData !== null) {
                console.log('get blog data from remote', blogData);
                form.reset({
                    title: blogData.title,
                    body: blogData.body,
                });
                setPostData(blogData);
            }
        });
    }, [isSyncWithRemote]);

    function onSubmit(value: z.infer<typeof formSchema>) {
        const data = {
            ...postData,
            title: value.title,
            body: value.body,
        };

        if (isCreateNewPost) {
            console.log('create new post with data', value);
            createIssueAction(
                userData.githubUser.userName,
                userData.blogRepoName ?? '',
                data
            ).then((res) => {
                res !== null
                    ? createIssueSuccessAction(res.postNumber)
                    : createIssueFailAction();
            });
            return;
        }
        updateIssueAction(
            postNumber,
            userData.githubUser.userName,
            userData.blogRepoName ?? '',
            data
        ).then((res) => {
            res !== null ? updateIssueSuccessAction() : updateIssueFailAction();
        });
    }
    const sectionHeader = (
        <SectionHeader
            title={
                isCreateNewPost ? '建立新貼文' : `編輯貼文: 貼文 ${postNumber}`
            }
            description={
                isCreateNewPost
                    ? '完成以下表單內容來你的新貼文'
                    : '編輯你的貼文（並同步更新到GitHub Issue 上面）'
            }
        />
    );

    return (
        <div className={'w-full h-auto flex flex-col justify-start py-6'}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={
                        'w-full h-auto flex flex-col justify-start space-y-4'
                    }
                >
                    <div
                        className={
                            'w-full flex flex-row justify-start items-center space-x-2'
                        }
                    >
                        <Button variant={'ghost'} size={'icon'} asChild>
                            <Link href={'/dashboard'}>
                                <LuArrowLeft
                                    className={'text-gray-500'}
                                    size={24}
                                />
                            </Link>
                        </Button>
                        {sectionHeader}
                    </div>
                    <FormSection
                        title={'文章基本資料'}
                        description={'標題/介紹/標籤/封面圖片'}
                    >
                        <TextInputField
                            controller={form.control}
                            name={'title'}
                            label={'文章標題'}
                            description={'文章標題'}
                            placeholder={'文章標題'}
                            isLoading={isPostSyncWithRemote}
                        />
                    </FormSection>
                    <FormSection
                        title={'文章內文編輯'}
                        description={'Markdown 編輯'}
                    >
                        <MarkdownEditFormField
                            name={'body'}
                            controller={form.control}
                            isLoading={isPostSyncWithRemote}
                        />
                    </FormSection>
                    <div
                        className={'w-full flex flex-row justify-end space-x-4'}
                    >
                        {isCreateNewPost ||
                        userData.blogRepoName === undefined ? null : (
                            <DeletePostButton
                                postData={postData}
                                userData={userData}
                            />
                        )}
                        <Button
                            type={'submit'}
                            className={
                                'flex flex-row justify-center items-center space-x-4'
                            }
                        >
                            {isCreateNewPost ? '新增貼文' : '更新貼文'}
                            <LuSaveAll size={20} />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
