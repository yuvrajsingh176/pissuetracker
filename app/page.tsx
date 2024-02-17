import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";

export default async function Home() {
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  return (
    <div>
      <LatestIssues />
      <IssueSummary closed={closed} inProgress={inProgress} open={open} />
    </div>
  );
}
// JM1PuYA_d26lVIB61FRN6w myy pass
