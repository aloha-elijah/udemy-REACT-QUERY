import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.py4e.com/api/people/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { isError, isLoading, isFetching, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["sw-peope"],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage || false}
      >
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.results.map((person) => (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            ))}
          </div>
        ))}
        {isError && <div>Error fetching data.</div>}
      </InfiniteScroll>
    </>
  );
}
