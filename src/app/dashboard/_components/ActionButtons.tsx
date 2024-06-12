import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LuArchive } from 'react-icons/lu';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { deleteDeployAction } from '@/actions/BlogAction';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useUserData } from '@/components/hooks/useUserData';
export function ArchiveBlog() {
    const { toast } = useToast();
    const router = useRouter();

    const { userData, isSyncWithRemote, syncUserData } = useUserData();

    const schema = z.object({
        secureProtectedKey: z
            .string()
            .refine((v) => v === userData.blogRepoName, '安全碼不正確'),
    });

    type formType = z.infer<typeof schema>;

    const form = useForm<formType>({
        defaultValues: {
            secureProtectedKey: '',
        },
    });

    const successAction = () => {
        syncUserData().then(() => {
            toast({
                title: '部落格已重新部署',
                description: '部落格已重新部署，請稍後重新整理',
            });
            router.push('deploy');
        });
    };
    const errorAction = () => {
        toast({
            title: '部落格重新部署失敗',
            description: '部落格重新部署失敗，請稍後再試',
        });
    };

    function onArchiveBlog(value: formType) {
        console.log('dashboard page: trigger archive blog...');
        console.log('value', value);
        if (value.secureProtectedKey !== userData.blogRepoName) {
            form.setError('secureProtectedKey', {
                type: 'manual',
                message: '安全碼不正確',
            });
            return;
        }

        deleteDeployAction(userData).then(successAction).catch(errorAction);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={isSyncWithRemote}
                    type={'button'}
                    variant={'outline'}
                    className={'flex flex-row justify-between text-destructive'}
                >
                    <LuArchive size={20} />
                    重新部署
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onArchiveBlog)}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                確定要重新部署部落格嗎？
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                重新部署部落格將會將你的部落格重新部署到最新狀態，並刪除對應的
                                Issue Repo
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <FormField
                            control={form.control}
                            name={'secureProtectedKey'}
                            render={({ field }) => (
                                <FormItem className={'py-2'}>
                                    <div>
                                        <FormLabel>
                                            請輸入Repo名稱來確認刪除 (
                                            <span
                                                className={
                                                    'font-semibold text-gray-500'
                                                }
                                            >
                                                {userData.blogRepoName}
                                            </span>
                                            )
                                        </FormLabel>
                                        <Input
                                            placeholder={'請輸入Repo名稱'}
                                            {...field}
                                        />
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                                type={'submit'}
                                className={'bg-destructive'}
                                disabled={
                                    form.watch().secureProtectedKey !==
                                    userData.blogRepoName
                                }
                            >
                                確定
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
