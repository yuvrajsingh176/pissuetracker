import prisma from "@/prisma/client";

import Issueform from "../../_components/Issueform";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
    if (!issue)
    notFound()
  return (
    <div>
          <Issueform issue={issue} />
    </div>
  );
};
export default EditIssuePage;
