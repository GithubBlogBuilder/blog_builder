import { cookies } from "next/headers";
import { BlogPostCard } from "@/app/dashboard/_components/BlogPostCard";
import { getIssues } from "@/domain/usecases/IssueUseCase";

export async function BlogPostCardListView() {
    const accessToken = cookies().get("access_token")?.value ?? "";
    const blogPosts = await getIssues(
        accessToken,
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
