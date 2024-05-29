"use server";

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28
export async function create_repo(
    access_token: string,
    template_name: string = "blog_builder_default_template",
    repo_name: string = "github_blog_storage"
) {
    const body = {
        name: repo_name,
        description: "Default template for Github Blog Builder",
        include_all_branches: false,
        private: false,
    };

    const response = await fetch(
        `https://api.github.com/repos/GithubBlogBuilder/${template_name}/generate`,
        {
            method: "POST",
            headers: {
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
        }
    );
    return response;
}
