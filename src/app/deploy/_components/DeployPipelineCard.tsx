import { DeployPipelineCardTemplate } from '@/app/deploy/_components/DeployPipelineCardTemplate';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { UserAvatar } from '@/components/blocks/UserAvatar';
import { useDeployData } from '@/app/deploy/_hooks/useDeployData';
import { useUserData } from '@/components/hooks/useUserData';
import { Skeleton } from '@/components/ui/skeleton';
import { ActionBar } from '@/app/deploy/_components/ActionBar';
import { LuArrowUp } from 'react-icons/lu';
import { GrDeploy } from 'react-icons/gr';
import { TextInputField } from '@/app/deploy/_components/formField/TextFormField';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { startDeployAction } from '@/actions/BlogAction';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const deployFormSchema = z.object({
    blogRepoName: z.string().min(1, '請輸入部落格名稱'),
});
type deployFormSchemaType = z.infer<typeof deployFormSchema>;
export function DeployPipelineCard() {
    const { toast } = useToast();
    const pipeLineIndex = 2;

    const { nextStep, prevStep, getStepState } = useDeployData();

    const deployStepData = getStepState(pipeLineIndex);

    const redirectUri =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth/login/callback'
            : 'https://blog-builder-theta.vercel.app/auth/login/callback';

    const { userData, setUserData, isSyncWithRemote, isSyncWithRemoteUpdate } =
        useUserData();

    const form = useForm<deployFormSchemaType>({
        resolver: zodResolver(deployFormSchema),
        defaultValues: {
            blogRepoName: userData.blogRepoName,
        },
    });

    useEffect(() => {
        form.setValue('blogRepoName', userData.blogRepoName || '');
    }, [isSyncWithRemote]);

    const [needToInstallApp, setNeedToInstallApp] = useState(false);

    const router = useRouter();
    async function onSubmit(values: deployFormSchemaType) {
        // console.log(values);
        // update to user data
        setUserData({
            ...userData,
            blogRepoName: values.blogRepoName,
        });

        const res = await startDeployAction({
            ...userData,
            blogRepoName: values.blogRepoName,
        });

        if (res === null) {
            toast({
                title: '部署成功',
                description:
                    '你的部落格已經成功部署，請前往儀表板編輯你的部落格內容',
                duration: 2000,
            });
            nextStep();
            router.push('/dashboard');
        } else {
            form.setError('blogRepoName', {
                type: 'manual',
                message: res ? res.message : '部署失敗',
            });
            if (res.status === 403) {
                setNeedToInstallApp(true);
            }
        }
    }

    return (
        <DeployPipelineCardTemplate
            layout={'row'}
            title={deployStepData.title}
            description={deployStepData.description}
            state={deployStepData.state}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={
                        'flex flex-col justify-center items-start space-y-6'
                    }
                >
                    <div
                        className={
                            'w-full flex flex-col justify-center items-start space-y-2'
                        }
                    >
                        {' '}
                        {isSyncWithRemote ? (
                            <Skeleton className={'w-full h-4 rounded-xl'} />
                        ) : (
                            <Label>Github Owner</Label>
                        )}
                        <UserAvatar
                            user={userData.githubUser}
                            isLoading={isSyncWithRemote}
                        ></UserAvatar>
                    </div>
                    <TextInputField
                        isLoading={isSyncWithRemote}
                        label={'你的 Github Repository 名稱'}
                        placeholder={'Your Github Repo'}
                        description={'此名稱在部署後無法變更'}
                        controller={form.control}
                        name={'blogRepoName'}
                    />
                    {!isSyncWithRemote ? (
                        <ActionBar
                            isFormSubmitAction={true}
                            isHidden={
                                isSyncWithRemote ||
                                deployStepData.state != 'processing' ||
                                needToInstallApp
                            }
                            back={{
                                label: '更改資訊',
                                icon: <LuArrowUp />,
                                onClick: () => prevStep(),
                            }}
                            next={{
                                label: '部署',
                                icon: <GrDeploy />,
                                // onClick: () => nextStep(),
                            }}
                        />
                    ) : null}
                    {
                        // if need to install app
                        needToInstallApp ? (
                            <Button variant={'destructive'} asChild>
                                <Link
                                    href={`https://github.com/apps/BlogBuilderAgent/installations/new?redirect_uri=${redirectUri}`}
                                >
                                    請完成 App Installation 再重新進行部署
                                </Link>
                            </Button>
                        ) : null
                    }
                </form>
            </Form>
        </DeployPipelineCardTemplate>
    );
}
