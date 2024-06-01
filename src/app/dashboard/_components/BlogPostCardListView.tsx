import { cookies } from "next/headers";
import { BlogTagEntity, PostEntity } from "@/domain/entities/PostEntity";
import { UserAvatar } from "@/components/blocks/UserAvatar";
import { LuText, LuThumbsUp, LuLink, LuGithub } from "react-icons/lu";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GetAllIssueUseCase } from "@/domain/usecases/issue/GetAllIssueUseCase";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TagChip({ tag }: { tag: BlogTagEntity }) {
    return (
        <div
            key={tag.id}
            className={
                "inline text-sm rounded-md px-2 py-0.5 border-2 break-keep overflow-clip"
            }
            style={{
                backgroundColor: `#${tag.color}1A`,
                borderColor: `#${tag.color}2A`,
            }}
        >
            {`# ${tag.label}`}
        </div>
    );
}
function OuterLinkButton({
    icon,
    label,
    link,
}: {
    icon: ReactNode;
    label: string;
    link: string;
}) {
    return (
        <Button variant={"secondary"} asChild className={""}>
            <Link
                href={link}
                target={"_blank"}
                className={"flex flex-row space-x-2 justify-end items-center"}
            >
                <p className={"text-sm font-semibold"}>{label}</p>
                {icon}
            </Link>
        </Button>
    );
}

function NumberLabelChip({
    icon,
    color = "bg-orange-500/15",
    number,
}: {
    icon: ReactNode;
    color: string;
    number: number;
}) {
    return (
        <div
            className={cn(
                color,
                "flex flex-row justify-center items-center rounded-xl px-2 py-1 space-x-1 text-foreground/80"
            )}
        >
            {icon}
            <p className={"text-sm font-semibold"}>{number}</p>
        </div>
    );
}

function IssuePostCard({ post }: { post: PostEntity }) {
    return (
        <Card
            key={post.id}
            className={"w-full p-4 flex flex-row justify-between items-center"}
        >
            <div
                className={"flex flex-col justify-center items-start space-y-4"}
            >
                <UserAvatar user={post.author} />
                <div
                    className={
                        "flex flex-row justify-center items-center space-x-2"
                    }
                >
                    <p className={"text-lg font-semibold"}>{post.title}</p>
                    <NumberLabelChip
                        icon={<LuText />}
                        color={"bg-green-500/15"}
                        number={post.commentNumber}
                    />
                    <NumberLabelChip
                        icon={<LuThumbsUp />}
                        color={"bg-orange-500/15"}
                        number={post.reactionNumber}
                    />
                </div>
                <div className={"flex flex-wrap justify-start space-x-2"}>
                    {post.tags.map((tag) => (
                        <TagChip key={tag.id} tag={tag} />
                    ))}
                </div>
            </div>
            <div className={"flex flex-col space-y-2 items-end justify-center"}>
                <OuterLinkButton
                    icon={<LuLink />}
                    link={"/"}
                    label={"網站位址"}
                />
                <OuterLinkButton
                    icon={<LuGithub />}
                    link={post.githubURL}
                    label={"Github 位置"}
                />
            </div>
        </Card>
    );
}

export async function BlogPostCardListView() {
    const blogPosts = await GetAllIssueUseCase(
        cookies(),
        "GithubBlogBuilder", // for testing
        "blog_builder_default_template" // for testing
    );

    return (
        <div className={"w-full flex flex-col space-y-4"}>
            {blogPosts?.map((post) => (
                <IssuePostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
