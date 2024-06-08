'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useUserData } from '@/components/hooks/useUserData';
import { useBlogPostData } from '@/app/dashboard/[issueNumber]/_hooks/useBlogPostData';
import { MarkdownDisplay } from '@/app/dashboard/[issueNumber]/_components/MarkdownDisplay';
import { PostEntity } from '@/domain/entities/PostEntity';
import { getIssuesWithIndex } from '@/actions/IssueAction';
import { BiLogoMeta } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { LuDelete, LuTrash, LuFileEdit, LuSaveAll } from 'react-icons/lu';
import { LucideEdit } from 'lucide-react';
import { LoadingSpinner } from '@/components/blocks/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function PostPage({
    params,
}: {
    params: { issueNumber: string };
}) {
    const { userData, isSyncWithRemote } = useUserData();
    const [postData, setPostData] = useState<PostEntity>();
    const [isPostSyncWithRemote, startSyncWithRemote] = useTransition();
    const postNumber = parseInt(params.issueNumber);

    // const { postData, isSyncWithRemote } = useBlogPostData(
    //     parseInt(params.issueNumber),
    //     userData.githubUser.userName,
    //     userData.blogRepoName ?? ''
    // );

    useEffect(() => {
        if (isSyncWithRemote) {
            console.log('user: syncing with remote...');
        } else {
            console.log('synced with remote complete!');
            startSyncWithRemote(async () => {
                console.log('syncing post data with remote...');
                const blogData = await getIssuesWithIndex(
                    postNumber,
                    userData.githubUser.userName,
                    userData.blogRepoName ?? ''
                );

                if (blogData !== null) {
                    console.log('blogData', blogData);
                    setPostData(blogData);
                }
                console.log('get user data');
            });
        }
    }, [isSyncWithRemote]);

    const loading = isSyncWithRemote || isPostSyncWithRemote;
    return (
        <div
            className={'w-full h-screen flex flex-col justify-start space-y-4'}
        >
            <BlogMetaEditForm postData={postData} />
            <BlogBodyEditForm postData={postData} />
            <div className={'w-full flex flex-row justify-end space-x-4 py-4'}>
                <Button
                    className={
                        'flex flex-row justify-center items-center space-x-4'
                    }
                    variant={'destructive'}
                >
                    <LuTrash size={20} />
                    刪除貼文
                </Button>
                <Button
                    className={
                        'flex flex-row justify-center items-center space-x-4'
                    }
                >
                    儲存
                    <LuSaveAll size={20} />
                </Button>
            </div>
        </div>
    );
}

export function BlogBodyEditForm({ postData }: { postData: PostEntity }) {
    return (
        <Card className={'min-h-[512px] flex flex-col'}>
            <CardHeader>
                <CardTitle>文章基本資料</CardTitle>
                <CardDescription>標題/介紹/標籤/封面圖片</CardDescription>
            </CardHeader>
            <CardContent className={'grow flex flex-col'}>
                <Tabs
                    defaultValue="Write"
                    className="flex flex-col items-start justify-start"
                >
                    <TabsList>
                        <TabsTrigger value="Write">撰寫</TabsTrigger>
                        <TabsTrigger value="Preview">預覽</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="Write"
                        className={'grow w-full h-[512px] bg-green-500 '}
                    >
                        <Textarea
                            style={{
                                resize: 'none',
                                width: '100%',
                                height: '100%',
                            }}
                            // rows={10}
                            // maxLength={10}
                            // minLength={10}
                            placeholder={'留言內容'}
                            onChange={(e) => {
                                console.log('e.target.value', e.target.value);
                                // setContent(e.target.value)
                            }}
                            value={postData?.body ?? ''}
                        />
                    </TabsContent>
                    <TabsContent value="Preview">
                        <MarkdownDisplay source={postData?.body ?? ''} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

export function BlogMetaEditForm({ postData }: { postData: PostEntity }) {
    const formSchema = z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>文章基本資料</CardTitle>
                <CardDescription>標題/介紹/標籤/封面圖片</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name={'title'}
                            render={({ field }) => (
                                <FormItem className={'w-full'}>
                                    <FormLabel>{'文章名稱'}</FormLabel>
                                    <Input
                                        placeholder={'文章名稱'}
                                        {...field}
                                        defaultValue={postData?.title}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'description'}
                            render={({ field }) => (
                                <FormItem className={'w-full'}>
                                    <FormLabel>{'文章簡介'}</FormLabel>
                                    <Textarea
                                        placeholder={'文章描述'}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'tags'}
                            render={({ field }) => (
                                <FormItem className={'w-full'}>
                                    <FormLabel>{'文章標籤'}</FormLabel>
                                    <Input
                                        placeholder={'文章標籤'}
                                        {...field}
                                        defaultValue={postData?.tags
                                            .map((tag) => `#${tag.label}`)
                                            .join(' ')}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
