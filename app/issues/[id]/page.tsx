import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditissueBtn from "./EditissueButton";
import IssueDetails from "./issueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneSelect from "./AssigneeSelect";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
interface Props {
  params: { id: string };
}
const IssuedetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneSelect issue={issue}/>
            <EditissueBtn issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
export default IssuedetailPage;
