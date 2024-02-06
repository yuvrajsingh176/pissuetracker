import prisma from "@/prisma/client";

// import Issueform from "../../_components/Issueform";

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormskeleton from "./loading";
const Issueform = dynamic(() => import("@/app/issues/_components/Issueform"), {
  ssr: false,
  loading:()=> <IssueFormskeleton />,
});
interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div>
      <Issueform issue={issue} />
    </div>
  );
};
export default EditIssuePage;
