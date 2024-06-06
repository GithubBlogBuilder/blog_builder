import { NextRequest, NextResponse } from "next/server";
import { getIssues } from "@/domain/usecases/IssueUseCase";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const token = query.get("token");

    if (!token) {
        return NextResponse.json(
            { error: "No access token found!" },
            { status: 402 }
        );
    }

    const user = query.get("user");
    const repo = query.get("repo");

    if (!user || !repo) {
        return NextResponse.json(
            { error: "Missing required parameters!" },
            { status: 400 }
        );
    }

    const issue = await getIssues(token, user, repo);
    return NextResponse.json(issue, { status: 200 });
}
