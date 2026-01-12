import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.py4e.com/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { isError, isLoading, isFetching, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["sw-species"],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  return (
    <>
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage || false}
      >
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.results.map((species) => (
              <Species key={species.name} {...species} />
            ))}
          </div>
        ))}
        {isFetching && <div>Loading...</div>}
      </InfiniteScroll>
    </>
  );
}
