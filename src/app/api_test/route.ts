import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { create_repo } from "@/actions/RepoActions";

import clientPromise from "@/lib/mongodb";
import { SortDirection } from "mongodb";

const { MongoClient, ServerApiVersion } = require("mongodb");

export async function GET(req: NextRequest) {
    // const access_token = cookies().get("access_token");
    // if (!access_token) {
    //     return NextResponse.json(
    //         { error: "No access token found!" },
    //         { status: 402 }
    //     );
    // }
    // const response: Response = await update_issue(
    //     access_token.value,
    //     "I_kwDOL_e7ws6KgdFn",
    //     "This is a test update issue",
    //     "Test update issue"
    // );
    // const json = await response.json();
}
