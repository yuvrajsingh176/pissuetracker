import { Box, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Issueactions from "./Issueactions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery, columnNames }  from "./IssueTable";

const Path = async ({
  searchParams,
}: {
  searchParams: IssueQuery;
}) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const statuses = Object.values(Status);
  let status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  let orderBy = columnNames
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;
  let issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });
  return (
    <div>
      <Issueactions />
<IssueTable issues={issues} searchParams={searchParams} />
      <Box className="mt-4 ">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Box>
    </div>
  );
};
export default Path;
