import {
    GithubIssueModel,
    GithubLabelModel,
} from "@/data/models/GithubIssueModel";
import { userModelToEntity, UserEntity } from "@/domain/entities/UserEntity";

interface BlogTagEntity {
    id: number;
    label: string;
    color: string;
}
interface PostEntity {
    id: number;
    nodeId: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    commentNumber: number;
    reactionNumber: number;
    tags: BlogTagEntity[];
    author: UserEntity;
}

function labelModelToEntity(issue: GithubLabelModel): BlogTagEntity {
    return {
        id: issue.id,
        label: issue.name,
        color: issue.color,
    };
}

function issueModelToEntity(issue: GithubIssueModel): PostEntity {
    // convert GithubIssueModel to PostEntity
    return {
        id: issue.id,
        nodeId: issue.nodeId,
        title: issue.title,
        body: issue.body,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
        commentNumber: issue.comments,
        reactionNumber: issue.reactions,
        tags: issue.labels.map(labelModelToEntity),
        author: userModelToEntity(issue.user),
    };
}

export type { PostEntity, BlogTagEntity };
export { issueModelToEntity, labelModelToEntity };
