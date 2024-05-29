import { TokenExchangeError } from "@/lib/errors";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl";

export async function githubLoginUseCase(
    exChangeCode: string | null,
    cookies: any
) {
    if (!exChangeCode) {
        throw new TokenExchangeError("No code provided");
    }

    const repository = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    const res = await repository.setNewAuthToken(exChangeCode);
}
