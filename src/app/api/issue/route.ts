import { NextRequest, NextResponse } from "next/server";
import {
    getIssueDetail,
    createIssue,
    updateIssue,
    deleteIssue,
} from "@/domain/usecases/IssueUseCase";

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
    const issueNumber = query.get("issue") as number | null;

    if (!user || !repo || !issueNumber) {
        return NextResponse.json(
            { error: "Missing required parameters!" },
            { status: 400 }
        );
    }

    const issue = await getIssueDetail(token, user, repo, issueNumber);
    if (!issue) {
        return NextResponse.json(
            { error: "Issue not found!" },
            { status: 404 }
        );
    }
    return NextResponse.json(issue, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const token = body.token;

    if (!token) {
        return NextResponse.json(
            { error: "No access token found!" },
            { status: 402 }
        );
    }

    if (!body.user || !body.repo || !body.title) {
        return NextResponse.json(
            { error: "Missing required parameters!" },
            { status: 400 }
        );
    }

    const issue = await createIssue(
        token,
        body.user,
        body.repo,
        body.title,
        body.body ?? "",
        body.labels ?? []
    );

    if (!issue) {
        return NextResponse.json(
            { error: "Failed to create issue!" },
            { status: 500 }
        );
    }

    return NextResponse.json(issue, { status: 201 });
}

export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const token = body.token;

    if (!token) {
        return NextResponse.json(
            { error: "No access token found!" },
            { status: 402 }
        );
    }

    if (!body.user || !body.repo || !body.issue || !body.title) {
        return NextResponse.json(
            { error: "Missing required parameters!" },
            { status: 400 }
        );
    }

    const issue = await updateIssue(
        token,
        body.user,
        body.repo,
        body.issue,
        body.title,
        body.body ?? ""
    );

    if (!issue) {
        return NextResponse.json(
            { error: "Failed to update issue!" },
            { status: 500 }
        );
    }

    return NextResponse.json(issue, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const token = body.token;

    if (!token) {
        return NextResponse.json(
            { error: "No access token found!" },
            { status: 402 }
        );
    }

    if (!body.user || !body.repo || !body.issue_node_id) {
        return NextResponse.json(
            { error: "Missing required parameters!" },
            { status: 400 }
        );
    }

    const result = deleteIssue(token, body.user, body.repo, body.issue_node_id);

    return result.then(
        () => NextResponse.json({}, { status: 200 }),
        (reason) => NextResponse.json({ error: reason }, { status: 500 })
    );
}
