import { BlogTagEntity, PostEntity } from "@/domain/entities/PostEntity";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/blocks/UserAvatar";
import { LuGithub, LuLink, LuText, LuThumbsUp } from "react-icons/lu";
function TagChip({ tag }: { tag: BlogTagEntity }) {
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
        <Button variant={"secondary"} size={"sm"} asChild>
            <Link
                href={link}
                target={"_blank"}
                className={"flex flex-row space-x-2 justify-end items-center"}
            >
                <p className={"md:block text-sm font-semibold"}>{label}</p>
                {icon}
            </Link>
        </Button>
    );
}

function NumberLabelChip({
    icon,
    color = "text-orange-500/15",
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
                "flex flex-row justify-center items-center rounded-xl px-2 py-1 space-x-1"
            )}
        >
            {icon}
            <p className={"text-sm font-semibold"}>{number}</p>
        </div>
    );
}

function TagChipListLayout({ children }: { children: ReactNode[] }) {
    return (
        <div className={"flex-wrap justify-start items-center space-x-2"}>
            {...children}
        </div>
    );
}

function ActionBarLayout({ children }: { children: ReactNode[] }) {
    // website url and github url link
    return (
        <div
            className={
                "hidden md:flex flex-row space-x-2 md:flex-col md:space-y-2 md:space-x-0 justify-center md:items-end"
            }
        >
            {...children}
        </div>
    );
}

function PostContent({ post }: { post: PostEntity }) {
    return (
        <div
            className={
                "flex flex-col justify-center items-start space-y-2 py-2"
            }
        >
            <UserAvatar user={post.author} />
            <div
                className={
                    "flex flex-row justify-center items-center space-x-2"
                }
            >
                <p className={"text-lg font-semibold"}>{post.title}</p>
                <div className={"hidden md:flex flex-row space-x-2"}>
                    <NumberLabelChip
                        icon={<LuText />}
                        color={"text-green-500"}
                        number={post.commentNumber}
                    />
                    <NumberLabelChip
                        icon={<LuThumbsUp />}
                        color={"text-orange-500"}
                        number={post.reactionNumber}
                    />
                </div>
            </div>
            <TagChipListLayout>
                {post.tags.map((tag) => (
                    <TagChip key={tag.id} tag={tag} />
                ))}
            </TagChipListLayout>
        </div>
    );
}

export function BlogPostCard({ post }: { post: PostEntity }) {
    return (
        <Card
            key={post.id}
            className={
                "w-full p-4 flex flex-col justify-start items-stretch md:flex-row md:justify-between"
            }
        >
            <PostContent post={post} />
            <ActionBarLayout>
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
            </ActionBarLayout>
        </Card>
    );
}
