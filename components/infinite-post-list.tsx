"use client";

import { useEffect, useCallback } from "react";
import { throttle } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "@/components/post-card";
import { Post, PageInfo } from "@/lib/types";
import { getAllPosts } from "@/lib/queries";

interface InfinitePostListProps {
  initialPosts: Post[];
  initialPageInfo: PageInfo;
  category?: string;
  searchTerm?: string;
}

export function InfinitePostList({
  initialPosts,
  initialPageInfo,
  category,
  searchTerm,
}: InfinitePostListProps) {
  const fetchPosts = async ({
    pageParam,
  }: {
    pageParam: string | undefined;
  }) => {
    return getAllPosts(8, pageParam, category, searchTerm);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts", category, searchTerm],
      queryFn: fetchPosts,
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
      initialData:
        category === undefined && searchTerm === undefined
          ? {
              pages: [{ posts: initialPosts, pageInfo: initialPageInfo }],
              pageParams: [undefined],
            }
          : undefined,
    });

  const posts =
    data?.pages
      .flatMap((page) => page.posts)
      .filter(
        (post, index, self) => self.findIndex((p) => p.id === post.id) === index
      ) || [];
  const pageInfo = data?.pages[data.pages.length - 1]?.pageInfo;

  const loadMore = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    // Core scroll logic
    const scrollCheck = () => {
      // Check if the user has scrolled close to the bottom (1000px margin)
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    // The throttled function will run at most once every 300ms
    const throttledHandleScroll = throttle(scrollCheck, 300);
    window.addEventListener("scroll", throttledHandleScroll);

    // Clean up the event listener AND cancel any pending throttled call
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      // Cancel any pending throttled execution on unmount/re-render cleanup
      throttledHandleScroll.cancel();
    };
  }, [loadMore]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-6 mb-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      {isFetchingNextPage && pageInfo?.hasNextPage && (
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      )}
    </>
  );
}
