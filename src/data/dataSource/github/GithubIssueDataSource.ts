
class GithubIssueDataSource {

    _accessToken: string
    _userName: string
    _repoName: string
    constructor(token: string, userName: string, repoName: string){
        this._accessToken= token
        this._userName = userName
        this._repoName = repoName
    }

    async listAllIssues() {

    }

    async createIssue() {

    }

    async updateIssue() {

    }

    async deleteIssue() {

    }

}