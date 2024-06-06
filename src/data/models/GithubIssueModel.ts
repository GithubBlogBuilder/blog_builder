import { GithubUserModel } from "@/data/models/GithubUserModel";

export interface GithubLabelModel {
    id: number;
    name: string;
    color: string;
}

export interface GithubIssueModel {
    id: number;
    nodeId: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    issueUrl: string;
    state: "open" | "closed" | "draft";
    comments: number;
    reactions: number;
    labels: GithubLabelModel[];
    user: GithubUserModel;
}

export function jsonToGithubIssueModel(issue: any): GithubIssueModel {
    return {
        id: issue.id,
        nodeId: issue.node_id,
        title: issue.title,
        issueUrl: issue.html_url,
        body: issue.body,
        labels: issue.labels,
        state: issue.state,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        comments: issue.comments,
        reactions: issue.reactions.total_count,
        user: {
            login: issue.user.login,
            id: issue.user.id,
            avatarUrl: issue.user.avatar_url,
        } as GithubUserModel,
    } as GithubIssueModel;
}
