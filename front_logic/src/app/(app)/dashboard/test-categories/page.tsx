import Loading from "@/app/loading";
import { getTestCategories } from "@/server_actions/(get-requests)/getTestCategories";
import { Suspense } from "react";
import { any } from "zod";
import TestCategoryList from "./components/TestCategoryList";
import { userAuthToken } from "@/server_actions/utils/getcookies";

export default async function TestCategoryPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Test Categories</h1>
        </div>
        <TestCategories />
      </div>
    </main>
  );
}

const TestCategories = async () => {
  const testcategories = await getTestCategories();

  return (
    <Suspense fallback={<Loading />}>
      {/* getting the data for the services and ranks for and displaying it in the form a table for the ranks */}
      <TestCategoryList testCategories={testcategories} token={userAuthToken} />
    </Suspense>
  );
};
