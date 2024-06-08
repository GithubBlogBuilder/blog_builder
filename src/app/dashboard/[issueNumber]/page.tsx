'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useUserData } from '@/components/hooks/useUserData';
// import { useBlogPostData } from '@/app/dashboard/[issueNumber]/_hooks/useBlogPostData';
import { MarkdownDisplay } from '@/app/dashboard/[issueNumber]/_components/MarkdownDisplay';
import { EmptyPostEntity, PostEntity } from '@/domain/entities/PostEntity';
import { getIssuesWithIndex, updateIssueAction } from '@/actions/IssueAction';
// import { BiLogoMeta } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import {
    LuDelete,
    LuTrash,
    LuFileEdit,
    LuSaveAll,
    LuArrowRight,
    LuArrowLeft,
} from 'react-icons/lu';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
    Form,
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
import { BlogTagChip } from '@/components/blocks/blog/BlogTagChip';
import { SectionHeader } from '@/app/dashboard/_components/SectionHeader';
import Link from 'next/link';
import { updateIssue } from '@/domain/usecases/IssueUseCase';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
    title: z.string(),
    // description: z.string(),
    // tags: z.array(z.string()),
    body: z.string(),
});

export default function PostPage({
    params,
}: {
    params: { issueNumber: string };
}) {
    const { userData, isSyncWithRemote } = useUserData();
    const [postData, setPostData] = useState<PostEntity>(EmptyPostEntity);
    const [isPostSyncWithRemote, startSyncWithRemote] = useTransition();
    const { toast } = useToast();
    const postNumber = parseInt(params.issueNumber);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

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
                    console.log('form: update form data');
                    form.reset({
                        title: blogData.title,
                        body: blogData.body,
                    });
                    setPostData(blogData);
                }
                console.log('get user data');
            });
        }
    }, [isSyncWithRemote]);

    function onSubmit(value: z.infer<typeof formSchema>) {
        console.log('issue form submit data', value);
        updateIssueAction(
            postNumber,
            userData.githubUser.userName,
            userData.blogRepoName ?? '',
            {
                ...postData,
                title: value.title,
                body: value.body,
            }
        ).then((res) => {
            console.log('update issue success', res);
            toast({
                title: '更新貼文成功',
                description: '貼文已經成功更新到 GitHub Issue 上面',
                duration: 2000,
            });
        });
    }

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
                        <SectionHeader
                            title={`編輯貼文: 貼文 ${postNumber}`}
                            description={
                                '編輯你的貼文（並同步更新到GitHub Issue 上面）'
                            }
                        />
                    </div>
                    <BlogMetaEditFormField control={form.control} />
                    <BlogBodyEditFormField control={form.control} />
                    <div
                        className={'w-full flex flex-row justify-end space-x-4'}
                    >
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
                            type={'submit'}
                            className={
                                'flex flex-row justify-center items-center space-x-4'
                            }
                        >
                            儲存
                            <LuSaveAll size={20} />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export function BlogMetaEditFormField({ control }: { control: any }) {
    return (
        <Card className={'flex flex-col'}>
            <CardHeader className={'grow-0'}>
                <CardTitle>文章內文</CardTitle>
                <CardDescription>Markdown 編輯</CardDescription>
            </CardHeader>
            <CardContent className={'grow flex flex-col'}>
                <FormField
                    name={'title'}
                    control={control}
                    render={({ field }) => (
                        <FormItem className={'w-full'}>
                            <FormLabel>{'文章內文'}</FormLabel>
                            <Input placeholder={'文章標題'} {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}

export function BlogBodyEditFormField({
    // postData.,
    control,
}: {
    // postData: PostEntity;
    control: any;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>文章內文</CardTitle>
                <CardDescription>Markdown 編輯</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                    control={control}
                    name={'body'}
                    render={({ field }) => (
                        <Tabs
                            defaultValue="Write"
                            className="grow flex flex-col items-start justify-start"
                        >
                            <TabsList>
                                <TabsTrigger value="Write">撰寫</TabsTrigger>
                                <TabsTrigger value="Preview">預覽</TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="Write"
                                className={'grow w-full flex flex-col'}
                            >
                                <Textarea {...field} rows={15} />
                            </TabsContent>
                            <TabsContent
                                value="Preview"
                                className={
                                    'p-2 w-full flex flex-col justify-center items-center'
                                }
                            >
                                <MarkdownDisplay source={field.value} />
                            </TabsContent>
                        </Tabs>
                    )}
                />
            </CardContent>
        </Card>
    );
}

{
    /*<FormField*/
}
{
    /*    control={form.control}*/
}
{
    /*    name={'description'}*/
}
{
    /*    render={({ field }) => (*/
}
{
    /*        <FormItem className={'w-full'}>*/
}
{
    /*            <FormLabel>{'文章簡介'}</FormLabel>*/
}
{
    /*            <Textarea*/
}
{
    /*                placeholder={'文章描述'}*/
}
{
    /*                {...field}*/
}
{
    /*            />*/
}
{
    /*            <FormMessage />*/
}
{
    /*        </FormItem>*/
}
{
    /*    )}*/
}
{
    /*/>*/
}
{
    /*<FormField*/
}
{
    /*    control={form.control}*/
}
{
    /*    name={'tags'}*/
}
{
    /*    render={({ field }) => (*/
}
{
    /*        <FormItem className={'w-full'}>*/
}
{
    /*            <FormLabel>{'文章標籤'}</FormLabel>*/
}
{
    /*            <Input*/
}
{
    /*                placeholder={'文章標籤'}*/
}
{
    /*                {...field}*/
}
{
    /*                defaultValue={postData?.tags*/
}
{
    /*                    .map((tag) => `#${tag.label}`)*/
}
{
    /*                    .join(' ')}*/
}
{
    /*            />*/
}
{
    /*            <FormMessage />*/
}
{
    /*        </FormItem>*/
}
{
    /*    )}*/
}
{
    /*/>*/
}
