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
import { LuTrash } from 'react-icons/lu';
import { deleteIssueAction } from '@/actions/IssueAction';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { PostEntity } from '@/domain/entities/PostEntity';
import { UserEntity } from '@/domain/entities/UserEntity';

export function DeletePostButton({
    postData,
    userData,
}: {
    postData: PostEntity;
    userData: UserEntity;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const toastAction = () => {
        toast({
            title: '刪除貼文成功',
            description: '貼文已經成功刪除',
            duration: 2000,
        });
    };

    const redirectAction = () => {
        router.replace('/dashboard');
    };

    const onDeletAction = async () => {
        console.log('delete post trigger');
        await deleteIssueAction(
            userData.githubUser.userName,
            userData.blogRepoName ?? '',
            postData
        );
        toastAction();
        redirectAction();
    };

    const deleteButton = (
        <Button
            id={'confirm-delete-btn'}
            className={'flex flex-row justify-center items-center space-x-4'}
            variant={'destructive'}
        >
            <LuTrash size={20} />
            刪除貼文
        </Button>
    );
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>確定要刪除 Post 嗎</AlertDialogTitle>
                    <AlertDialogDescription>
                        已刪除的Post無法復原
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel id={'cancel-delete-btn'}>
                        取消
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant={'destructive'} onClick={onDeletAction}>
                            刪除貼文
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
