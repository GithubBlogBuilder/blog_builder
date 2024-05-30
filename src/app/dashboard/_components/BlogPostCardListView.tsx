import { cookies } from "next/headers";
import { BlogTagEntity, PostEntity } from "@/domain/entities/PostEntity";
import { UserAvatar } from "@/components/blocks/UserAvatar";
import { LuText } from "react-icons/lu";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GetAllIssueUseCase } from "@/domain/usecases/issue/GetAllIssueUseCase";

export function TagChip({ tag }: { tag: BlogTagEntity }) {
    return (
        <div
            key={tag.id}
            className={
                "inline text-sm font-mono rounded-md px-3 py-1 border-2 break-keep overflow-clip"
            }
            style={{
                backgroundColor: `#${tag.color}1A`,
                borderColor: `#${tag.color}`,
            }}
        >
            {`# ${tag.label}`}
        </div>
    );
}

function NumberLabel({
    icon,
    color = "bg-orange-500/25",
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
                "flex flex-row justify-center items-center rounded-xl px-2 py-1  space-x-1"
            )}
        >
            {icon}
            <p className={"text-sm font-semibold "}>{number}</p>
        </div>
    );
}

function IssuePostCard({ post }: { post: PostEntity }) {
    return (
        <Card
            key={post.id}
            className={"w-full p-4 flex flex-row justify-between items-start"}
        >
            <div className={"flex flex-row justify-center items-start"}>
                <div
                    className={
                        "flex flex-col justify-center items-start space-y-4"
                    }
                >
                    <UserAvatar user={post.author} />
                    <div
                        className={
                            "flex flex-row justify-center items-center space-x-2"
                        }
                    >
                        <p className={"text-xl font-semibold"}>{post.title}</p>
                        <NumberLabel
                            icon={<LuText />}
                            color={"bg-green-500/25"}
                            number={post.commentNumber}
                        />
                        <NumberLabel
                            icon={<LuText />}
                            color={"bg-orange-500/25"}
                            number={post.reactionNumber}
                        />
                    </div>
                    <div className={"flex flex-wrap justify-start space-x-2"}>
                        {post.tags.map((tag) => (
                            <TagChip key={tag.id} tag={tag} />
                        ))}
                    </div>
                </div>
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
        <div className={"w-full"}>
            {blogPosts?.map((post) => (
                <IssuePostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
