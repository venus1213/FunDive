import * as React from "react";
import { Suspense } from "react";
import { BookmarkList } from "@/components/features/project/bookmarkList";


export default async function BookmarksPage() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <main className="flex-1 py-6 md:py-8">
          <Suspense fallback={<div>読み込み中...</div>}>
            <BookmarkList />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 