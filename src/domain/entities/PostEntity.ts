import {
    GithubIssueModel,
    GithubLabelModel,
} from "@/data/models/GithubIssueModel";
import {
    userModelToEntity,
    UserEntity,
    githubUserModelToEntity,
    GithubUserEntity,
} from "@/domain/entities/UserEntity";

interface BlogTagEntity {
    id: number;
    label: string;
    color: string;
}

interface PostEntity {
    id: number;
    nodeId: string;
    title: string;
    githubURL: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    commentNumber: number;
    reactionNumber: number;
    tags: BlogTagEntity[];
    author: GithubUserEntity;
}

function labelModelToEntity(issue: GithubLabelModel): BlogTagEntity {
    return {
        id: issue.id,
        label: issue.name,
        color: issue.color,
    } as BlogTagEntity;
}

function issueModelToEntity(issue: GithubIssueModel): PostEntity {
    return {
        id: issue.id,
        nodeId: issue.nodeId,
        githubURL: issue.issueUrl,
        title: issue.title,
        body: issue.body,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
        commentNumber: issue.comments,
        reactionNumber: issue.reactions,
        tags: issue.labels.map(labelModelToEntity),
        author: githubUserModelToEntity(issue.user),
    } as PostEntity;
}

export type { PostEntity, BlogTagEntity };
export { issueModelToEntity, labelModelToEntity };
