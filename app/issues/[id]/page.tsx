import prisma from "@/prisma/client";
import { Box,  Grid,  } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditissueBtn from "./EditissueButton";
import IssueDetails from "./issueDetails";
interface Props {
  params: { id: string };
}
const IssuedetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
       <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditissueBtn issueId={issue.id} />
      </Box>
    </Grid>
  );
};
export default IssuedetailPage;
