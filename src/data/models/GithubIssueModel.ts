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
    state: "open" | "closed" | "draft";
    comments: number;
    reactions: number;
    labels: GithubLabelModel[];
    user: GithubUserModel;
}
