import * as React from "react";
import { Input } from "@/components/ui/input";
import { useBlogStore } from "@/store/blog-store";
import { Search } from "lucide-react";

export function BlogSearch() {
  const { searchQuery, setSearchQuery } = useBlogStore();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="記事を検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
} 