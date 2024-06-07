import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getIssueDetail, updateIssue } from "@/domain/usecases/IssueUseCase";

export async function GET(req: NextRequest) {
    const access_token = cookies().get("access_token")?.value;
    if (!access_token) {
        return NextResponse.json(
            { error: "No access token found!" },
            { status: 402 }
        );
    }
    const issue = await getIssueDetail(
        access_token,
        "GithubBlogBuilder",
        "blog_builder_default_template",
        7
    );
    if (!issue?.nodeId) {
        return NextResponse.json(
            { error: "Issue not found!" },
            { status: 404 }
        );
    }
    // const updatedIssue = await updateIssue(
    //     access_token,
    //     "Cutiemango",
    //     "github_blog_storage",
    //     4,
    //     "testing!",
    //     "testing body!"
    // );
    // if (!updatedIssue) {
    //     return NextResponse.json(
    //         { error: "Failed to update issue!" },
    //         { status: 500 }
    //     );
    // }
    return NextResponse.json(issue, { status: 200 });
}
