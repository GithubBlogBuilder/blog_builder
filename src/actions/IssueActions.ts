"use server";

// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28
export async function list_issues(
    access_token: string,
    owner: string,
    repo: string = "github_blog_storage"
) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
            method: "GET",
            headers: {
                Accept: "application/vnd.github.raw+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        }
    );
    return response;
}

// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28
export async function create_issue(
    access_token: string,
    owner: string,
    repo: string = "github_blog_storage"
) {
    const postBody = {
        title: "Test create issue",
        body: "I'm having a problem with this.",
        assignees: [],
        labels: ["bug"],
    };
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
            method: "POST",
            headers: {
                Accept: "application/vnd.github.raw+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(postBody),
        }
    );
    return response;
}

// https://docs.github.com/en/graphql/reference/mutations#updateissue
export async function update_issue(
    access_token: string,
    issue_node_id: string,
    body: string,
    title: string
) {
    const postBody = {
        query: `
            mutation {
                updateIssue(input: {id: "${issue_node_id}", body: "${body}", title: "${title}"}) {
                    issue {
                        body
                        title
                    }
                }
            }
        `,
    };
    const response = await fetch(`https://api.github.com/graphql`, {
        method: "POST",
        headers: {
            Accept: "application/vnd.github.v4+json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(postBody),
    });
    return response;
}

// https://docs.github.com/en/graphql/reference/mutations#deleteissue
export async function delete_issue(
    access_token: string,
    issue_node_id: string
) {
    const postBody = {
        query: `
            mutation {
                deleteIssue(input: {issueId: "${issue_node_id}", clientMutationId: "${issue_node_id}"}) {
                    clientMutationId
                }
            }
        `,
    };
    const response = await fetch(`https://api.github.com/graphql`, {
        method: "POST",
        headers: {
            Accept: "application/vnd.github.v4+json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(postBody),
    });
    return response;
}
