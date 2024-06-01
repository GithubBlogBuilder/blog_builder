import { cookies } from "next/headers";
import { GetAllIssueUseCase } from "@/domain/usecases/issue/GetAllIssueUseCase";
import { BlogPostCard } from "@/app/dashboard/_components/BlogPostCard";

export async function BlogPostCardListView() {
    const blogPosts = await GetAllIssueUseCase(
        cookies(),
        "GithubBlogBuilder", // for testing
        "blog_builder_default_template" // for testing
    );

    return (
        <div className={"w-full flex flex-col space-y-2"}>
            {blogPosts?.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
