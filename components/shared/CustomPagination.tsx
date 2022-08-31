import { MouseEvent, useEffect, useState } from "react";
import PageInput from "./PageInput";
import { useRouter } from "next/router";
import classNames from "classnames";

interface PaginationProps {
  totalPages: number;
  left?: boolean;
  center?: boolean;
  right?: boolean;
}

export default function CustomPagination({
  totalPages,
  left = false,
  center = false,
  right = false,
}: PaginationProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const replacePage = (page: string) => {
    setTimeout(() => {
      router.replace({
        query: { ...router.query, page: String(page) },
      });
      setCurrentPage(Number(page));
    }, 100);
  };

  const handleChangePage = (e: MouseEvent<HTMLLIElement>) => {
    replacePage(String(e.currentTarget.dataset.id));
  };

  const handleInputPage = (page: number) => {
    if (page > totalPages) {
      replacePage(String(totalPages));
      return;
    }

    if (page < 1) {
      replacePage(String(1));
      return;
    }

    replacePage(String(page));
  };

  useEffect(() => {
    const { page } = router.query;
    setCurrentPage(page ? parseInt(String(page)) : 1);
  }, [router.query]);

  return (
    <div
      className={classNames(
        "absolute-center min-h-[56px] w-full bg-cyan-400/0 flex items-center"
      )}
    >
      <ul
        className={classNames(
          "flex h-full w-full flex-wrap items-center lg:gap-4 text-3xl text-gray-700",
          {
            "justify-start": left,
            "justify-center": center,
            "justify-end": right,
          }
        )}
      >
        <li
          onClick={handleChangePage}
          data-id={1}
          className={`pagination-active rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 hover:bg-gray-300/60"
              : "bg-highlight hover:bg-highlight/25"
          } py-1 px-3 lg:py-1 lg:px-4 text-lg font-secondary  transition-all hover:cursor-pointer `}
        >
          1
        </li>

        {currentPage > 4 && (
          <PageInput setCurrentPage={handleInputPage} totalPages={totalPages} />
        )}

        {[
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ].map((number) => {
          if (number > 1 && number < totalPages)
            return (
              <li
                key={number}
                onClick={handleChangePage}
                data-id={number}
                className={`pagination-active rounded-lg ${
                  number === currentPage
                    ? "bg-gray-300 hover:bg-gray-300/60"
                    : "bg-highlight hover:bg-highlight/25"
                } py-1 px-3 lg:py-1 lg:px-4 text-lg font-secondary  transition-all hover:cursor-pointer hover:bg-highlight/25`}
              >
                {number}
              </li>
            );
        })}

        {totalPages - currentPage > 3 && (
          <PageInput setCurrentPage={handleInputPage} totalPages={totalPages} />
        )}

        <li
          onClick={handleChangePage}
          data-id={totalPages}
          className={`pagination-active rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 hover:bg-gray-300/60"
              : "bg-highlight hover:bg-highlight/25"
          } py-1 px-3 lg:py-1 lg:px-4 text-lg font-secondary  transition-all hover:cursor-pointer hover:bg-highlight/25`}
        >
          {totalPages}
        </li>
      </ul>
    </div>
  );
}
