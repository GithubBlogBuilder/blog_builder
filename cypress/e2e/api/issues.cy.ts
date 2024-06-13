import { BlogTagEntity, PostEntity } from '@/domain/entities/PostEntity';

interface Label {
    id: number;
    node_id: string;
    name: string;
    color: string;
}

interface Issue {
    id: number;
    node_id: string;
    number: number;
    state: 'open' | 'closed';
    title: string;
    body: string | null;
    labels: Label[];
}

describe('Test issues API', () => {
    const token = Cypress.env('test_access_token');
    const user = Cypress.env('test_user_name');
    const repo = Cypress.env('test_repo_name');

    function listGitHubIssues() {
        return cy
            .request({
                method: 'GET',
                url: `https://api.github.com/repos/${user}/${repo}/issues`,
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${token}`,
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })
            .then((response) => {
                return response;
            });
    }

    function getGitHubIssue(issue: number) {
        return cy
            .request({
                method: 'GET',
                url: `https://api.github.com/repos/${user}/${repo}/issues/${issue}`,
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${token}`,
                    'X-GitHub-Api-Version': '2022-11-28',
                },
                failOnStatusCode: false,
            })
            .then((response) => {
                return response;
            });
    }

    function validateIfIssuesEqual(issue: PostEntity, gitHubIssue: Issue) {
        expect(issue.id).to.equal(gitHubIssue.id);
        expect(issue.nodeId).to.equal(gitHubIssue.node_id);
        expect(issue.postNumber).to.equal(gitHubIssue.number);
        // expect(issue.state).to.equal(gitHubIssue.state);
        expect(issue.title).to.equal(gitHubIssue.title);
        expect(issue.body).to.equal(gitHubIssue.body);
        expect(
            issue.tags.map((tag: BlogTagEntity) => tag.label)
        ).to.have.members(gitHubIssue.labels.map((label: Label) => label.name));
    }

    it('lists issues', () => {
        cy.request({
            method: 'GET',
            url: '/api/issues',
            qs: {
                token: token,
                user: user,
                repo: repo,
            },
        }).then((response) => {
            const issues = response.body;
            listGitHubIssues().then((gitHubResponse) => {
                const gitHubIssues = gitHubResponse.body;
                expect(issues).to.be.an('array');
                expect(issues.length).to.equal(gitHubIssues.length);
                issues.forEach((issue: PostEntity, index: number) => {
                    validateIfIssuesEqual(issue, gitHubIssues[index]);
                });
            });
        });
    });

    it('creates, updates, and deletes an issue successfully', () => {
        let issueNumber: number, issueNodeId: string;
        const issueData = {
            title: 'Test Title',
            body: 'test body...',
            labels: ['test', 'new'],
        };
        const newIssueData = {
            title: 'Test Title 2',
            body: "I'm updated 😮",
            labels: ['test', 'old', 'latest'],
        };

        // Create an issue
        cy.request({
            method: 'POST',
            url: '/api/issue',
            body: {
                token: token,
                user: user,
                repo: repo,
                ...issueData,
            },
        })
            .then((response) => {
                // Validate the response
                expect(response.status).to.equal(201);
                const issue = response.body;
                expect(issue.title).to.equal(issueData.title);
                expect(issue.body).to.equal(issueData.body);
                expect(
                    issue.tags.map((tag: BlogTagEntity) => tag.label)
                ).to.have.members(issueData.labels);
                issueNumber = response.body.postNumber;
                issueNodeId = response.body.nodeId;

                // Get the issue
                return cy.request({
                    method: 'GET',
                    url: '/api/issue',
                    qs: {
                        token: token,
                        user: user,
                        repo: repo,
                        issue: issueNumber,
                    },
                });
            })
            .then((response) => {
                // Validate the response
                expect(response.status).to.equal(200);
                getGitHubIssue(issueNumber).then((gitHubResponse) => {
                    validateIfIssuesEqual(response.body, gitHubResponse.body);
                });

                // Update the issue
                return cy.request({
                    method: 'PATCH',
                    url: '/api/issue',
                    body: {
                        token: token,
                        user: user,
                        repo: repo,
                        issue: issueNumber,
                        ...newIssueData,
                    },
                });
            })
            .then((response) => {
                // Validate the response
                expect(response.status).to.equal(200);
                const issue = response.body;
                expect(issue.title).to.equal(newIssueData.title);
                expect(issue.body).to.equal(newIssueData.body);
                expect(
                    issue.tags.map((tag: BlogTagEntity) => tag.label)
                ).to.have.members(newIssueData.labels);

                // Get the issue
                return cy.request({
                    method: 'GET',
                    url: '/api/issue',
                    qs: {
                        token: token,
                        user: user,
                        repo: repo,
                        issue: issueNumber,
                    },
                });
            })
            .then((response) => {
                // Validate the response
                expect(response.status).to.equal(200);
                getGitHubIssue(issueNumber).then((gitHubResponse) => {
                    validateIfIssuesEqual(response.body, gitHubResponse.body);
                });

                // Delete the issue
                return cy.request({
                    method: 'DELETE',
                    url: '/api/issue',
                    body: {
                        token: token,
                        user: user,
                        repo: repo,
                        issue_node_id: issueNodeId,
                    },
                });
            })
            .then((response) => {
                // Validate the response
                expect(response.status).to.equal(200);

                // Get the issue
                return cy.request({
                    method: 'GET',
                    url: '/api/issue',
                    qs: {
                        token: token,
                        user: user,
                        repo: repo,
                        issue: issueNumber,
                    },
                    failOnStatusCode: false,
                });
            })
            .then((response) => {
                // Validate the response
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('Issue not found!');
                getGitHubIssue(issueNumber).then((gitHubResponse) => {
                    // expect(gitHubResponse.status).to.equal(404);
                    // expect(gitHubResponse.body.error).to.equal('Issue not found!');
                    expect(gitHubResponse.status).to.equal(410);
                    expect(gitHubResponse.body.message).to.equal(
                        'This issue was deleted'
                    );
                });
            });
    });

    it('fails when listing issues', () => {
        const completeParams: { [key: string]: any } = {
            token: token,
            user: user,
            repo: repo,
        };

        for (const key in completeParams) {
            const params = { ...completeParams };
            delete params[key];
            cy.request({
                method: 'GET',
                url: '/api/issues',
                qs: params,
                failOnStatusCode: false,
            }).then((response) => {
                if (key === 'token') {
                    expect(response.status).to.equal(402);
                    expect(response.body.error).to.equal(
                        'No access token found!'
                    );
                } else {
                    expect(response.status).to.equal(400);
                    expect(response.body.error).to.equal(
                        'Missing required parameters!'
                    );
                }
            });
        }
    });

    it('fails when creating an issue', () => {
        const completeParams: { [key: string]: any } = {
            token: token,
            user: user,
            repo: repo,
            title: 'Test Title',
        };

        for (const key in completeParams) {
            const params = { ...completeParams };
            delete params[key];
            cy.request({
                method: 'POST',
                url: '/api/issue',
                body: params,
                failOnStatusCode: false,
            }).then((response) => {
                if (key === 'token') {
                    expect(response.status).to.equal(402);
                    expect(response.body.error).to.equal(
                        'No access token found!'
                    );
                } else {
                    expect(response.status).to.equal(400);
                    expect(response.body.error).to.equal(
                        'Missing required parameters!'
                    );
                }
            });
        }
    });

    it('fails when getting an issue', () => {
        const completeParams: { [key: string]: any } = {
            token: token,
            user: user,
            repo: repo,
            issue: 1, // no need to consider becasue it must fail
        };

        for (const key in completeParams) {
            const params = { ...completeParams };
            delete params[key];
            cy.request({
                method: 'GET',
                url: '/api/issue',
                qs: params,
                failOnStatusCode: false,
            }).then((response) => {
                if (key === 'token') {
                    expect(response.status).to.equal(402);
                    expect(response.body.error).to.equal(
                        'No access token found!'
                    );
                } else {
                    expect(response.status).to.equal(400);
                    expect(response.body.error).to.equal(
                        'Missing required parameters!'
                    );
                }
            });
        }
    });

    it('fails when updating an issue', () => {
        const completeParams: { [key: string]: any } = {
            token: token,
            user: user,
            repo: repo,
            issue: 1, // no need to consider becasue it must fail
            title: 'Test Title',
        };

        for (const key in completeParams) {
            const params = { ...completeParams };
            delete params[key];
            cy.request({
                method: 'PATCH',
                url: '/api/issue',
                body: params,
                failOnStatusCode: false,
            }).then((response) => {
                if (key === 'token') {
                    expect(response.status).to.equal(402);
                    expect(response.body.error).to.equal(
                        'No access token found!'
                    );
                } else {
                    expect(response.status).to.equal(400);
                    expect(response.body.error).to.equal(
                        'Missing required parameters!'
                    );
                }
            });
        }
    });

    it('fails when deleting an issue', () => {
        const completeParams: { [key: string]: any } = {
            token: token,
            user: user,
            repo: repo,
            issue_node_id: 'test', // no need to consider becasue it must fail
        };

        for (const key in completeParams) {
            const params = { ...completeParams };
            delete params[key];
            cy.request({
                method: 'DELETE',
                url: '/api/issue',
                body: params,
                failOnStatusCode: false,
            }).then((response) => {
                if (key === 'token') {
                    expect(response.status).to.equal(402);
                    expect(response.body.error).to.equal(
                        'No access token found!'
                    );
                } else {
                    expect(response.status).to.equal(400);
                    expect(response.body.error).to.equal(
                        'Missing required parameters!'
                    );
                }
            });
        }
    });
});
