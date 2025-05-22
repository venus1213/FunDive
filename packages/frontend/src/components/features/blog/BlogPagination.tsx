import * as React from "react";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/blog-store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BlogPagination() {
  const { currentPage, getTotalPages, setCurrentPage } = useBlogStore();
  const totalPages = getTotalPages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(page)}
          className="min-w-[2.5rem]"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 